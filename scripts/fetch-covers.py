"""Fetch TMDB posters and save to assets/covers/{track_id}.jpg"""
import json
import os
import time
import urllib.request

ROOT = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(ROOT, "assets", "covers")
os.makedirs(OUT, exist_ok=True)

# Read-only TMDB API key (set TMDB_API_KEY env to override)
API_KEY = os.environ.get("TMDB_API_KEY", "8265bd1679663a7ea12ac168da84d2e8")
UA = "SongappCoverBot/1.0"

TMDB_IDS = {
    "raavana": 575265,
    "oru-pere": 619930,
    "kacheri": 1076344,
    "2000s-fast-beat": 63647,
    "maduraikku": 21950,
    "otha-sollaala": 58478,
    "chella-kutti": 340526,
    "akkam-pakkam": 69402,
    "yaar-indha-saalai-oram": 205446,
    "velicha-poove": 194246,
    "en-kannu-kulla": 349392,
    "sirukki-vaasam": 334071,
    "sivappu-manjal-pachai": 432524,
    "aaruyirae": 12208,
}


def api_get(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def poster_url(movie_id: int) -> str | None:
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}"
    data = api_get(url)
    path = data.get("poster_path")
    if path:
        return f"https://image.tmdb.org/t/p/w500{path}"
    return None


def download(url: str, dest: str) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        body = resp.read()
    if len(body) < 2000:
        return False
    with open(dest, "wb") as f:
        f.write(body)
    return True


def main():
    ok = 0
    for track_id, mid in TMDB_IDS.items():
        dest = os.path.join(OUT, f"{track_id}.jpg")
        try:
            purl = poster_url(mid)
            if not purl:
                print(f"no poster: {track_id} (tmdb {mid})")
                continue
            print(f"{track_id} <- {purl}")
            time.sleep(0.4)
            if download(purl, dest):
                print(f"ok {track_id}")
                ok += 1
        except Exception as e:
            print(f"fail {track_id}: {e}")
        time.sleep(0.5)
    print(f"Done {ok}/{len(TMDB_IDS)}")


if __name__ == "__main__":
    main()
