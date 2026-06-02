$ErrorActionPreference = "Stop"
$outDir = Join-Path $PSScriptRoot "..\assets\covers"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$ua = "SongappCoverBot/1.0 (local music player; contact: user)"

$covers = @{
  "raavana" = "https://vijay.com/jana-nayagan-poster.jpg"
  "oru-pere" = "https://vijay.com/jana-nayagan-poster-2.jpg"
  "kacheri" = "https://vijay.com/jana-nayagan-poster-3.jpg"
  "2000s-fast-beat" = "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Ghilli.jpg/330px-Ghilli.jpg"
  "maduraikku" = "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Azhagiya_Tamizh_Magan_poster.jpg/330px-Azhagiya_Tamizh_Magan_poster.jpg"
  "otha-sollaala" = "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Velmurugan_film_poster.jpg/330px-Velmurugan_film_poster.jpg"
  "chella-kutti" = "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Theri_poster.jpg/330px-Theri_poster.jpg"
  "akkam-pakkam" = "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Kireedam_2007.jpg/330px-Kireedam_2007.jpg"
  "yaar-indha-saalai-oram" = "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Thalaivaa_poster.jpg/330px-Thalaivaa_poster.jpg"
  "velicha-poove" = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Ethir_Neechal.jpg/330px-Ethir_Neechal.jpg"
  "en-kannu-kulla" = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Appuchi_Gramam.jpg/330px-Appuchi_Gramam.jpg"
  "sirukki-vaasam" = "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Kodi_%282016_film%29.jpg/330px-Kodi_%282016_film%29.jpg"
  "sivappu-manjal-pachai" = "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Sivappu_Manjal_Pachai_poster.jpg/330px-Sivappu_Manjal_Pachai_poster.jpg"
  "aaruyirae" = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Guru_%282007_film%29.jpg/330px-Guru_%282007_film%29.jpg"
}

foreach ($id in $covers.Keys) {
  $dest = Join-Path $outDir "$id.jpg"
  if (Test-Path $dest) { Write-Host "skip $id"; continue }
  try {
    Start-Sleep -Milliseconds 1500
    Invoke-WebRequest -Uri $covers[$id] -OutFile $dest -UserAgent $ua -UseBasicParsing
    Write-Host "ok $id"
  } catch {
    Write-Host "fail $id : $_"
  }
}
