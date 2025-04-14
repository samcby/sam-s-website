// 网易云音乐歌曲URL获取API

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // 歌曲ID
  const level = searchParams.get('level') || 'higher'; // 音质等级: standard/higher/exhigh/lossless/hires

  if (!id) {
    return Response.json(
      { error: '缺少歌曲ID参数' }, 
      { status: 400 }
    );
  }

  console.log(`请求歌曲ID ${id} 的音频数据，音质: ${level}`);
  
  // 首先检查歌曲是否可用
  let isAvailable = false;
  try {
    console.log('检查歌曲是否可用...');
    const checkUrl = `https://neteasecloudmusicapi.vercel.app/check/music?id=${id}`;
    const checkResponse = await fetch(checkUrl);
    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      isAvailable = checkData.success;
      console.log(`歌曲可用性检查结果: ${isAvailable ? '可用' : '不可用'} - ${checkData.message || ''}`);
    }
  } catch (error) {
    console.error('检查歌曲可用性失败:', error);
  }

  try {
    // 方法1: 使用新版API获取音乐URL (音质可选)
    try {
      console.log('正在使用新版API获取歌曲数据...');
      const apiUrl = `https://neteasecloudmusicapi.vercel.app/song/url/v1?id=${id}&level=${level}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('新版API响应数据:', data);
        
        if (data.code === 200 && data.data && data.data[0] && data.data[0].url) {
          const audioUrl = data.data[0].url;
          console.log('获取到音频URL:', audioUrl);
          
          // 查看是否是试听片段
          const freeTrialInfo = data.data[0].freeTrialInfo;
          if (freeTrialInfo) {
            console.log('试听片段信息:', freeTrialInfo);
          }
          
          // 获取音频数据
          const audioResponse = await fetch(audioUrl);
          if (audioResponse.ok) {
            console.log('成功获取音频数据, 类型:', audioResponse.headers.get('Content-Type'));
            
            // 获取音频数据
            const audioData = await audioResponse.arrayBuffer();
            
            // 返回音频数据并设置正确的MIME类型
            const headers = new Headers();
            headers.set('Content-Type', audioResponse.headers.get('Content-Type') || 'audio/mpeg');
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set('Cache-Control', 'public, max-age=86400');
            
            return new Response(audioData, {
              status: 200,
              headers
            });
          } else {
            console.error('无法获取音频数据:', audioResponse.status);
          }
        } else {
          console.error('API返回数据无效:', data);
        }
      } else {
        console.error('API请求失败:', response.status);
      }
    } catch (error) {
      console.error('使用新版API获取音频失败:', error);
    }
    
    // 方法2: 使用外链直连（推荐做法）
    try {
      console.log('使用外链直连获取音频...');
      
      // 使用直链URL (网易官方支持的方法)
      const directUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      console.log('直链URL:', directUrl);
      
      // 这里我们不直接返回URL，而是代理请求，避免跨域问题
      const directResponse = await fetch(directUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://music.163.com/'
        },
        redirect: 'follow'
      });
      
      if (directResponse.ok) {
        console.log('直链请求成功，状态:', directResponse.status);
        
        // 获取重定向后的真实URL
        const realUrl = directResponse.url;
        console.log('重定向至真实URL:', realUrl);
        
        // 获取音频数据
        const directData = await directResponse.arrayBuffer();
        
        // 返回音频数据并设置正确的MIME类型
        const headers = new Headers();
        headers.set('Content-Type', directResponse.headers.get('Content-Type') || 'audio/mpeg');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Cache-Control', 'public, max-age=86400');
        
        return new Response(directData, {
          status: 200,
          headers
        });
      } else {
        console.error('直链请求失败:', directResponse.status);
      }
    } catch (error) {
      console.error('使用直链获取音频失败:', error);
    }
    
    // 方法3: 备选方法 - 移动API
    if (!isAvailable) {
      console.log('歌曲不可用，尝试其他备选方法...');
      
      try {
        console.log('尝试移动API获取音频...');
        const mobileApiUrl = `https://music.163.com/api/song/enhance/player/url?id=${id}&ids=[${id}]&br=320000`;
        
        const mobileResponse = await fetch(mobileApiUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
            'Referer': 'https://music.163.com/',
            'Origin': 'https://music.163.com'
          }
        });
        
        if (mobileResponse.ok) {
          const mobileData = await mobileResponse.json();
          console.log('移动API响应:', mobileData);
          
          if (mobileData.code === 200 && mobileData.data && mobileData.data[0] && mobileData.data[0].url) {
            const mobileAudioUrl = mobileData.data[0].url;
            console.log('获取到移动API音频URL:', mobileAudioUrl);
            
            // 获取音频数据
            const mobileAudioResponse = await fetch(mobileAudioUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
                'Referer': 'https://music.163.com/'
              }
            });
            
            if (mobileAudioResponse.ok) {
              console.log('成功获取移动API音频数据');
              
              // 获取音频数据并返回
              const mobileAudioData = await mobileAudioResponse.arrayBuffer();
              
              // 返回音频数据并设置正确的MIME类型
              const headers = new Headers();
              headers.set('Content-Type', mobileAudioResponse.headers.get('Content-Type') || 'audio/mpeg');
              headers.set('Access-Control-Allow-Origin', '*');
              headers.set('Cache-Control', 'public, max-age=86400');
              
              return new Response(mobileAudioData, {
                status: 200,
                headers
              });
            }
          }
        }
      } catch (error) {
        console.error('使用移动API获取音频失败:', error);
      }
    }
    
    // 返回错误信息
    console.log('所有方法都失败，返回错误提示');
    
    if (!isAvailable) {
      // 返回VIP限制提示
      const vipErrorMessage = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">
          <rect width="300" height="100" fill="#f0f0f0" rx="10" ry="10"/>
          <text x="20" y="40" font-family="Arial" font-size="16" fill="#e74c3c">此歌曲为VIP专属或版权受限</text>
          <text x="20" y="70" font-family="Arial" font-size="14" fill="#7f8c8d">请尝试播放其他歌曲或更换歌单</text>
        </svg>
      `;
      
      const encoder = new TextEncoder();
      const vipErrorResponse = encoder.encode(vipErrorMessage);
      
      const headers = new Headers();
      headers.set('Content-Type', 'image/svg+xml');
      headers.set('Access-Control-Allow-Origin', '*');
      
      return new Response(vipErrorResponse, {
        status: 200,
        headers
      });
    } else {
      // 通用错误提示
      const errorMessage = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">
          <rect width="300" height="100" fill="#f0f0f0" rx="10" ry="10"/>
          <text x="20" y="40" font-family="Arial" font-size="16" fill="#e74c3c">无法播放此歌曲</text>
          <text x="20" y="70" font-family="Arial" font-size="14" fill="#7f8c8d">请稍后再试或播放其他歌曲</text>
        </svg>
      `;
      
      const encoder = new TextEncoder();
      const errorResponse = encoder.encode(errorMessage);
      
      const headers = new Headers();
      headers.set('Content-Type', 'image/svg+xml');
      headers.set('Access-Control-Allow-Origin', '*');
      
      return new Response(errorResponse, {
        status: 200,
        headers
      });
    }
  } catch (error) {
    console.error('获取音频全部失败:', error);
    
    return Response.json({
      success: false,
      error: error.message || '获取音频失败'
    }, { status: 500 });
  }
} 