"""Screenshot every route in 4 variants and fail on CSP, page errors or mobile overflow.
Run after `npm run build`: npm run capture"""
import json, socket, subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / ".captures"
PORT = 4173
BASE = f"http://localhost:{PORT}"
ROUTES = ["/", "/projects", "/projects/path-os", "/about", "/record", "/notes",
          "/notes/course-difficulty-predictor", "/nope"]
SIZES = {"mobile": (390, 844), "desktop": (1440, 900)}

csp = json.loads((ROOT / "vercel.json").read_text())["headers"][0]["headers"][0]
assert csp["key"] == "Content-Security-Policy", "vercel.json headers[0] must hold the CSP"

if not (ROOT / "dist").is_dir():
    sys.exit("dist/ missing. Run `npm run build` first.")
def listening():
    try:
        socket.create_connection(("localhost", PORT), timeout=1).close()
        return True
    except OSError:
        return False

if listening():
    sys.exit(f"Port {PORT} is in use. Stop that process first.")

def add_csp(route):
    if "/_vercel/" in route.request.url:  # only exists on Vercel; preview would answer with index.html
        return route.fulfill(status=404, body="")
    resp = route.fetch()
    headers = dict(resp.headers)
    if "text/html" in headers.get("content-type", ""):
        headers["content-security-policy"] = csp["value"]
    route.fulfill(response=resp, headers=headers)

OUT.mkdir(exist_ok=True)
for f in OUT.glob("*.png"):
    f.unlink()
problems = []
server = subprocess.Popen(["npx", "vite", "preview", "--port", str(PORT), "--strictPort"],
                          cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    for _ in range(60):
        if server.poll() is not None:
            sys.exit("vite preview exited early")
        if listening():
            break
        time.sleep(0.5)
    else:
        sys.exit("vite preview did not start in 30s")

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for size, (w, h) in SIZES.items():
            for scheme in ("light", "dark"):
                ctx = browser.new_context(viewport={"width": w, "height": h}, color_scheme=scheme)
                ctx.route(f"{BASE}/**", add_csp)
                for path in ROUTES:
                    tag = f"{path} {size} {scheme}"
                    page = ctx.new_page()
                    page.on("console", lambda m, t=tag: m.text and "Content Security Policy" in m.text
                            and problems.append(f"CSP: {t}: {m.text[:120]}"))
                    page.on("pageerror", lambda e, t=tag: problems.append(f"pageerror: {t}: {e}"))
                    page.goto(BASE + path, wait_until="networkidle")
                    page.wait_for_timeout(600)  # let entrance motion settle
                    if size == "mobile" and page.evaluate(
                            "document.documentElement.scrollWidth > document.documentElement.clientWidth"):
                        problems.append(f"horizontal scroll: {tag}")
                    name = ("home" if path == "/" else path.strip("/").replace("/", "-")) + f"-{size}-{scheme}.png"
                    page.screenshot(path=str(OUT / name), full_page=True)
                    page.close()
                ctx.close()
        browser.close()
finally:
    server.terminate()
    server.wait()

print(f"{len(list(OUT.glob('*.png')))} screenshots in {OUT}")
for p in problems:
    print("FAIL", p)
sys.exit(1 if problems else 0)
