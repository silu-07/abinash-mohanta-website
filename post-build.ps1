# PowerShell script to move Angular build output from docs/browser/* to docs/
# and generate 404.html for Angular SPA routing on GitHub Pages
# Use after every ng build

$src = "docs/browser"
$dest = "docs"

if (Test-Path $src) {
    Write-Host "Moving files from $src to $dest..."
    $maxRetries = 5
    $retryDelay = 2 # seconds
    $lockedFiles = @()
    $files = Get-ChildItem -Path $src -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        $moved = $false
        $attempts = 0
        while (-not $moved -and $attempts -lt $maxRetries) {
            try {
                Move-Item -Path $file.FullName -Destination $dest -Force
                $moved = $true
            } catch {
                $attempts++
                if ($attempts -lt $maxRetries) {
                    Write-Host "File $($file.Name) is locked. Retrying in $retryDelay seconds... (Attempt $attempts of $maxRetries)"
                    Start-Sleep -Seconds $retryDelay
                } else {
                    Write-Host "File $($file.Name) could not be moved after $maxRetries attempts."
                    $lockedFiles += $file.FullName
                }
            }
        }
    }
    # Move directories (such as media) with retry logic
    $dirs = Get-ChildItem -Path $src -Directory -ErrorAction SilentlyContinue
    foreach ($dir in $dirs) {
        $moved = $false
        $attempts = 0
        while (-not $moved -and $attempts -lt $maxRetries) {
            try {
                Move-Item -Path $dir.FullName -Destination $dest -Force
                $moved = $true
            } catch {
                $attempts++
                if ($attempts -lt $maxRetries) {
                    Write-Host "Directory $($dir.Name) is locked. Retrying in $retryDelay seconds... (Attempt $attempts of $maxRetries)"
                    Start-Sleep -Seconds $retryDelay
                } else {
                    Write-Host "Directory $($dir.Name) could not be moved after $maxRetries attempts."
                }
            }
        }
    }
    # Try to remove the source directory if empty
    try {
        Remove-Item $src -Recurse -Force -ErrorAction SilentlyContinue
    } catch {}
    Write-Host "Move and cleanup attempted. All movable files and directories are now in $dest."
    if ($lockedFiles.Count -gt 0) {
        Write-Host "The following files could not be moved (likely locked):"
        $lockedFiles | ForEach-Object { Write-Host $_ }
    } else {
        Write-Host "No remaining files in $src."
    }
    # List any files that could not be moved
    if (Test-Path $src) {
        $remainingFiles = Get-ChildItem -Path $src -File -ErrorAction SilentlyContinue
        if ($remainingFiles) {
            Write-Host "The following files could not be moved (likely locked):"
            $remainingFiles | ForEach-Object { Write-Host $_.FullName }
        } else {
            Write-Host "No remaining files in $src."
        }
    }
} else {
    Write-Host "$src does not exist. Nothing to move."
}

# Generate 404.html for SPA fallback
$spa404 = @"
<!--
  Custom 404 page for Angular SPA on GitHub Pages
  Redirects all 404s to index.html with hash route so Angular router can handle the route.
-->
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Redirecting...</title>
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <link href=\"https://fonts.googleapis.com/css?family=Montserrat:700,400&display=swap\" rel=\"stylesheet\">
  <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', Arial, sans-serif;
      color: #222;
      overflow: hidden;
    }
    .card {
      background: #fff;
      padding: 2.5rem 2.5rem 2rem 2.5rem;
      border-radius: 1.5rem;
      box-shadow: 0 6px 32px 0 rgba(108,99,255,0.11), 0 1.5px 6px rgba(0,0,0,0.04);
      text-align: center;
      position: relative;
      min-width: 320px;
      max-width: 90vw;
      z-index: 2;
      animation: fadeIn 1.1s cubic-bezier(.4,0,.2,1);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: none; }
    }
    .icon-404 {
      font-size: 4.5rem;
      color: #fc5c7d;
      margin-bottom: 0.7rem;
      margin-top: 0.2rem;
      text-shadow: 0 2px 8px rgba(108,99,255,0.09);
      display: block;
    }
    .spinner {
      margin: 1.5rem auto 0.5rem auto;
      width: 2.5rem;
      height: 2.5rem;
      border: 0.35rem solid #eee;
      border-top: 0.35rem solid #6a82fb;
      border-radius: 50%;
      animation: spin 1.1s linear infinite;
      display: inline-block;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    h2 {
      font-size: 2.1rem;
      font-weight: 700;
      margin: 0.7rem 0 0.3rem 0;
      color: #6a82fb;
      letter-spacing: 1px;
    }
    p {
      font-size: 1.1rem;
      color: #555;
      margin-bottom: 1.5rem;
    }
    a {
      color: #fc5c7d;
      text-decoration: none;
      font-weight: 700;
      border-bottom: 2px solid #fc5c7d33;
      transition: color 0.2s, border-bottom 0.2s;
    }
    a:hover {
      color: #6a82fb;
      border-bottom: 2px solid #6a82fb99;
    }
    .bg-blob {
      position: absolute;
      z-index: 1;
      width: 320px;
      height: 320px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(1.3);
      background: radial-gradient(circle at 60% 40%, #6a82fb44 0%, #fc5c7d33 100%);
      filter: blur(32px);
      border-radius: 50%;
      pointer-events: none;
    }
  </style>
  <script type=\"text/javascript\">
    // Get the path after the repo name
    var repo = '/abinash-mohanta-website';
    var path = window.location.pathname.startsWith(repo) ? window.location.pathname.substr(repo.length) : window.location.pathname;
    // If already on a hash URL, just redirect as before
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      var newUrl = repo + '/index.html' + window.location.hash + window.location.search;
      window.location.replace(newUrl);
    } else {
      // If not, convert the path to a hash
      var newUrl = repo + '/index.html#' + path + window.location.search + window.location.hash;
      window.location.replace(newUrl);
    }
  </script>
  <noscript>
    <meta http-equiv=\"refresh\" content=\"0; url=/abinash-mohanta-website/index.html\">
  </noscript>
</head>
<body>
  <div class=\"bg-blob\"></div>
  <div class=\"card\">
    <span class=\"icon-404\">🚦 404</span>
    <div class=\"spinner\"></div>
    <h2>Redirecting...</h2>
    <p>You tried to visit a page that doesn't exist.<br>We’re sending you back to safety!</p>
    <p>If you are not redirected, <a href=\"/abinash-mohanta-website/index.html\">click here</a>.</p>
  </div>
</body>
</html>
"@

Set-Content -Path "docs/404.html" -Value $spa404 -Encoding UTF8
Write-Host "404.html generated in docs/ folder."
