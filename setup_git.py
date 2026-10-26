import subprocess
import os

repo_dir = r"C:\Users\aarry\.gemini\antigravity\scratch\meridian-learning"
git_exe = r"C:\Users\aarry\AppData\Local\Programs\MinGit\cmd\git.exe"

def run_git(args):
    res = subprocess.run([git_exe] + args, cwd=repo_dir, capture_output=True, text=True)
    print("git", " ".join(args), "->", res.returncode)
    if res.stdout.strip():
        print("STDOUT:", res.stdout.strip())
    if res.stderr.strip():
        print("STDERR:", res.stderr.strip())
    return res

run_git(["init"])
run_git(["config", "user.name", "Aarryan69"])
run_git(["config", "user.email", "Aarryan69@users.noreply.github.com"])
run_git(["branch", "-M", "main"])

# Remove origin if present
run_git(["remote", "remove", "origin"])
run_git(["remote", "add", "origin", "https://github.com/Aarryan69/prototype-meridian-learning-.git"])
run_git(["add", "."])
run_git(["status", "--short"])
run_git(["commit", "-m", "Initial commit: Meridian Learning CAT Readiness working prototype"])
