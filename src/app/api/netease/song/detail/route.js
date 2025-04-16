// 网易云音乐歌曲详情API

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids'); // 歌曲ID

  if (!ids) {
    return Response.json(
      { error: '缺少歌曲ID参数' }, 
      { status: 400 }
    );
  }

  try {
    // 获取歌曲详情
    // 尝试使用playlist API中的已有数据 - 这可能更可靠
    const playlistId = '13153655441'; // 可以从query参数中获取
    const playlistApiUrl = `https://music.163.com/api/playlist/detail?id=${playlistId}`;
    
    // 先尝试从歌单中获取
    try {
      const playlistResponse = await fetch(playlistApiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          'Referer': 'https://music.163.com/',
          'Origin': 'https://music.163.com',
          'Accept': 'application/json, text/plain, */*'
        }
      });
      
      if (playlistResponse.ok) {
        const playlistData = await playlistResponse.json();
        if (playlistData.result && playlistData.result.tracks) {
          // 查找匹配的歌曲
          const track = playlistData.result.tracks.find(t => t.id.toString() === ids.toString());
          if (track) {
            // 找到了匹配的歌曲，直接返回
            console.log('从歌单中找到匹配的歌曲数据');
            return Response.json({
              result: {
                songs: [track]
              },
              code: 200
            });
          }
        }
      }
    } catch (playlistError) {
      console.error('从歌单获取数据失败，尝试直接获取歌曲:', playlistError);
    }
    
    // 如果从歌单获取失败，则使用song/detail API
    const apiUrl = `https://music.163.com/api/song/detail?ids=[${ids}]`;
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Referer': 'https://music.163.com/',
        'Origin': 'https://music.163.com',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    if (!response.ok) {
      console.error(`歌曲详情API请求失败: ${response.status} ${response.statusText}`);
      
      // 返回一个模拟的响应，避免前端解析错误
      return Response.json({
        songs: [{
          id: ids,
          name: `歌曲 ID: ${ids}`,
          artists: [{ name: '未知歌手' }],
          album: { name: '未知专辑', picUrl: null },
          duration: 0
        }],
        code: 200
      });
    }

    const data = await response.json();
    console.log('成功获取歌曲详情:', data.code);
    
    return Response.json(data);
  } catch (error) {
    console.error('获取歌曲详情失败:', error);
    
    // 返回一个模拟的响应，避免前端解析错误
    return Response.json({
      songs: [{
        id: ids,
        name: `歌曲 ID: ${ids}`,
        artists: [{ name: '未知歌手' }],
        album: { name: '未知专辑', picUrl: null },
        duration: 0
      }],
      code: 200
    }, { status: 200 });
  }
} 