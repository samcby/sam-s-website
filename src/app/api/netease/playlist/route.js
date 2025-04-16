// 网易云音乐歌单获取API
// 注意：这是一个代理API，需要配置服务器环境变量以保存API密钥等敏感信息

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("id");

  if (!playlistId) {
    return Response.json(
      {
        code: 400,
        message: "Missing playlist ID",
      },
      { status: 400 }
    );
  }

  try {
    // 获取歌单基本信息
    const basicInfoUrl = `https://neteasecloudmusicapi.vercel.app/playlist/detail?id=${playlistId}`;
    const basicInfoResponse = await fetch(basicInfoUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!basicInfoResponse.ok) {
      throw new Error(`获取歌单信息失败: ${basicInfoResponse.status}`);
    }

    const basicInfoData = await basicInfoResponse.json();

    // 获取歌单中的所有歌曲
    const allTracksUrl = `https://neteasecloudmusicapi.vercel.app/playlist/track/all?id=${playlistId}`;
    const allTracksResponse = await fetch(allTracksUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!allTracksResponse.ok) {
      throw new Error(`获取歌单歌曲失败: ${allTracksResponse.status}`);
    }

    const allTracksData = await allTracksResponse.json();

    // 合并歌单信息和歌曲数据
    const mergedData = {
      code: 200,
      result: {
        ...basicInfoData.playlist,
        tracks: allTracksData.songs || [],
      },
    };

    return Response.json(mergedData);
  } catch (error) {
    return Response.json(
      {
        code: 500,
        message: error.message || "获取歌单失败",
      },
      { status: 500 }
    );
  }
}
