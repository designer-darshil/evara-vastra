import urllib.request
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

components = [
    "button", "badge", "input", "label", "sheet", "dialog", "drawer", 
    "dropdown-menu", "tabs", "accordion", "pagination", "toast", "toaster",
    "tooltip", "skeleton", "breadcrumb", "carousel", "select"
]

os.makedirs("/Users/jarvis/Documents/evara/src/components/ui", exist_ok=True)
if not os.path.exists("/Users/jarvis/Documents/evara/src/hooks"):
    os.makedirs("/Users/jarvis/Documents/evara/src/hooks")

for comp in components:
    url = f"https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/registry/default/ui/{comp}.tsx"
    
    # Hooks go to hooks dir
    if comp == "use-toast":
        url = "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/registry/default/hooks/use-toast.ts"
        dest = f"/Users/jarvis/Documents/evara/src/hooks/use-toast.ts"
    else:
        dest = f"/Users/jarvis/Documents/evara/src/components/ui/{comp}.tsx"
        
    print(f"Fetching {comp}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')
            # Fix imports
            content = content.replace("@/lib/utils", "../../lib/utils")
            content = content.replace("@/components/ui", ".")
            content = content.replace("@/hooks/use-toast", "../../hooks/use-toast")
            with open(dest, "w") as f:
                f.write(content)
    except Exception as e:
        print(f"Failed to fetch {comp}: {e}")
