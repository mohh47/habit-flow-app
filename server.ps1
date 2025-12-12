$port = 8000
$root = Get-Location
$Host.UI.RawUI.WindowTitle = "SERVER - DO NOT CLOSE"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Clear-Host
Write-Host "============================" -ForegroundColor Green
Write-Host " TAWAKKAL APP SERVER IS ON  " -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: DO NOT CLOSE THIS WINDOW!" -ForegroundColor Red -BackgroundColor Yellow
Write-Host "Keep this window MINIMIZED while using the app" -ForegroundColor Red -BackgroundColor Yellow
Write-Host ""
Write-Host "-> Just MINIMIZE it using the (-) button" -ForegroundColor Cyan
Write-Host "-> Closing it will stop the app" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server started at http://localhost:$port/"
Start-Process "http://localhost:$port/index.html"

# Mime Types
$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".json" = "application/json"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $root.Path + $request.Url.LocalPath.Replace('/', '\')
        
        if ($localPath.EndsWith('\')) {
            $localPath += "index.html"
        }

        if (Test-Path $localPath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($localPath)
            $contentType = $mimeTypes[$extension]
            if (-not $contentType) { $contentType = "application/octet-stream" }
            
            $content = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.StatusCode = 200
        }
        else {
            $response.StatusCode = 404
        }
        
        $response.Close()
    }
}
finally {
    $listener.Stop()
}
