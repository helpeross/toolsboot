# =============================================================================
# ToolsBoot build script (Windows PowerShell / Cloudflare Pages 可参考)
# 用法:  powershell -ExecutionPolicy Bypass -File build.ps1
# 1) 用本机 hugo.exe 全量构建到 public/
# 2) 清理 Hugo v0.165 多语言模式下生成的 /en/ 404 stub 目录
#    （en 是默认语言，页面实际输出在站点根；public/en/ 只是空壳，删掉无害）
# =============================================================================
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

# Clear Hugo's cached templates/i18n (incremental builds can serve stale
# i18n dictionaries and render empty {{ i18n }} values - seen with nav_home).
$cache = "$root\resources"
if (Test-Path $cache) {
    Remove-Item $cache -Recurse -Force
    Write-Host "Cleared Hugo cache (resources/)."
}

& "$root\hugo.exe" --destination "$root\public"
if ($LASTEXITCODE -ne 0) { throw "hugo build failed" }

# Remove the /en/ 404 stub that Hugo v0.165 regenerates on every multilingual build
$stub = "$root\public\en"
if (Test-Path $stub) {
    Remove-Item $stub -Recurse -Force
    Write-Host "Removed stale /en/ stub."
}

# Hugo's multilingual root sitemap.xml is a <sitemapindex> that points at
# /en/sitemap.xml and /zh-cn/sitemap.xml. After the /en/ stub is removed the
# EN sitemap link would be dead, so regenerate the root sitemap as an EN
# <urlset> covering the actual English pages that live at the site root.
$enUrls = @(
    "https://toolsboot.com/",
    "https://toolsboot.com/tools/"
)
Get-ChildItem "$root\public\tools" -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    if (Test-Path "$($_.FullName)\index.html") {
        $enUrls += "https://toolsboot.com/tools/$($_.Name)/"
    }
}
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<?xml version="1.0" encoding="utf-8" standalone="yes"?>')
[void]$sb.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($u in $enUrls) {
    [void]$sb.AppendLine("  <url><loc>$u</loc></url>")
}
[void]$sb.AppendLine('</urlset>')
[System.IO.File]::WriteAllText("$root\public\sitemap.xml", $sb.ToString(), (New-Object System.Text.UTF8Encoding $false))
Write-Host "Regenerated root sitemap.xml with $($enUrls.Count) EN URLs."

Write-Host "Build OK -> $root\public"
