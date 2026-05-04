
Add-Type -AssemblyName System.Drawing
$srcDir = "d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼"
$destDir = "d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\public\assets\portfolio\goseong"

if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force }

function ResizeImage($srcName, $destName) {
    $srcPath = Join-Path $srcDir $srcName
    $destPath = Join-Path $destDir $destName
    
    if (Test-Path $srcPath) {
        Write-Host "Processing: $srcName ..."
        $img = [System.Drawing.Image]::FromFile($srcPath)
        $newWidth = 1200
        $newHeight = [int]($img.Height * ($newWidth / $img.Width))
        
        $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($newImg)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        $newImg.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        
        $g.Dispose()
        $newImg.Dispose()
        $img.Dispose()
        Write-Host "Success: Saved to $destName"
    } else {
        Write-Host "Error: $srcName not found"
    }
}

ResizeImage "기후의변호인들.JPG" "session1.jpg"
ResizeImage "지구명상.JPG" "session2.jpg"
ResizeImage "기후아트경매.jpg" "session3.jpg"
