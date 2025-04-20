// 网易云音乐歌词获取API

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get("id");

  if (!trackId) {
    return Response.json(
      {
        code: 400,
        message: "Missing track ID",
      },
      { status: 400 }
    );
  }

  try {
    // 从网易云音乐API获取歌词
    const lyricsUrl = `https://neteasecloudmusicapi.vercel.app/lyric?id=${trackId}`;
    const lyricsResponse = await fetch(lyricsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!lyricsResponse.ok) {
      throw new Error(`获取歌词失败: ${lyricsResponse.status}`);
    }

    const lyricsData = await lyricsResponse.json();

    // 转发API响应
    return Response.json(lyricsData);
  } catch (error) {
    return Response.json(
      {
        code: 500,
        message: error.message || "获取歌词失败",
      },
      { status: 500 }
    );
  }
}
