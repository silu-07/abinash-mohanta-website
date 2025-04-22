# PowerShell script to generate 404.html for Angular SPA on GitHub Pages
dollar = [char]36
$spa404 = @"
<!--
  Custom 404 page for Angular SPA on GitHub Pages
  Redirects all 404s to index.html so Angular router can handle the route.
-->
<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Redirecting...</title>
  <script type=\"text/javascript\">
    // Get the path after the domain
    var redirectTo = '/abinash-mohanta-website/index.html';
    var hash = window.location.hash ? window.location.hash : '';
    var search = window.location.search ? window.location.search : '';
    // Preserve route and params in hash
    window.location.replace(redirectTo + hash + search);
  </script>
  <noscript>
    <meta http-equiv=\"refresh\" content=\"0; url=/abinash-mohanta-website/index.html\">
  </noscript>
</head>
<body>
  <h2>Redirecting...</h2>
  <p>If you are not redirected, <a href=\"/abinash-mohanta-website/index.html\">click here</a>.</p>
</body>
</html>
"@

Set-Content -Path "docs/404.html" -Value $spa404 -Encoding UTF8
Write-Host "404.html generated in docs/ folder."
