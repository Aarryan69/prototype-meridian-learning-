import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def run():
    os.chdir(DIRECTORY)
    # Find free port starting at 8000
    port = PORT
    server = None
    for p in range(PORT, PORT + 20):
        try:
            server = socketserver.TCPServer(("", p), Handler)
            port = p
            break
        except OSError:
            continue

    if not server:
        print(f"Error: Could not bind to any port from {PORT} to {PORT+20}")
        sys.exit(1)

    url = f"http://localhost:{port}"
    print("=" * 64)
    print("  MERIDIAN LEARNING — CAT Readiness & Learner Identity")
    print("  Working Prototype for 'Ace the Case 2026' (Summit x AceMBA)")
    print("=" * 64)
    print(f"  • Local Prototype URL:  {url}")
    print(f"  • Serving directory:   {DIRECTORY}")
    print(f"  • Features:")
    print(f"    - Desktop & Phone Frame Simulator (iPhone 16 / Android)")
    print(f"    - 6-Screen Core Loop (Intake -> Diagnostic -> Post-Mortem ->")
    print(f"      Readiness Signals -> Next Best Drill -> Learner Identity)")
    print(f"    - Dynamic Persona Testing (Harshit, Pulkit, Vedtrayee)")
    print(f"    - Case Evidence & Competitor Crosswalk Drawer")
    print("=" * 64)
    print("  Press Ctrl+C to stop the server.")
    print("=" * 64)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Meridian Prototype server.")
        server.server_close()

if __name__ == "__main__":
    run()
