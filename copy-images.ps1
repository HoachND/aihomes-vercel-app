[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$base = "d:\0.0.Automation VimAI\ANTIGRAVITY_VimAI\0.VimAI_ VIMGROUP\DATA VimAI_2026.04\VimAI_Customer\AI Homes\Image Du An Tieu Bieu"
$dest = "d:\0.0.Automation VimAI\ANTIGRAVITY_VimAI\0.VimAI_ VIMGROUP\DATA VimAI_2026.04\VimAI_Customer\AI Homes\aihomes-vercel-app\public\images\projects"

# Get all source dirs sorted alphabetically
$srcDirs = Get-ChildItem -Path $base -Directory | Sort-Object Name

# Target names in the same alphabetical order as source
$targetNames = @(
    "biet-thu-anh-minh",
    "chung-cu-379-doi-can",
    "chung-cu-eurowindow",
    "chung-cu-hd-mon",
    "chung-cu-lancaster",
    "chung-cu-northern-diamond",
    "chung-cu-thanh-thai",
    "trung-tam-hoc-tap",
    "van-phong-dliebe",
    "van-phong-easygoing",
    "van-phong-99design",
    "homestay-tam-dao",
    "khach-san",
    "nha-pho-chi-mai",
    "spa-lavender"
)

for ($i = 0; $i -lt $srcDirs.Count; $i++) {
    $src = $srcDirs[$i]
    $target = $targetNames[$i]
    $dstDir = Join-Path $dest $target
    
    New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
    $files = Get-ChildItem -Path $src.FullName -File -Filter "*.png" | Sort-Object Name
    $count = 0
    foreach ($f in $files) {
        $count++
        Copy-Item -Path $f.FullName -Destination (Join-Path $dstDir "$count.png") -Force
    }
    Write-Host "$target : $count files (from $($src.Name))"
}

Write-Host "`nAll done! Total $($srcDirs.Count) projects copied."
