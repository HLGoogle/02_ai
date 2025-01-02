async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const result = document.getElementById('result');
    const generateBtn = document.getElementById('generateBtn');
    
    if (!prompt) {
        alert('请输入图片描述');
        return;
    }

    // 禁用按钮并显示加载状态
    generateBtn.disabled = true;
    result.innerHTML = '<div class="loading">正在生成图片，请稍候...</div>';
    
    try {
        const response = await fetch('https://ai.hl273573221.workers.dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            throw new Error(`请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.url) {
            const img = document.createElement('img');
            img.src = data.url;
            result.innerHTML = '';
            result.appendChild(img);
        } else {
            result.innerHTML = '<div class="error">生成失败：' + (data.error || '未知错误') + '</div>';
        }
    } catch (error) {
        result.innerHTML = '<div class="error">发生错误：' + error.message + '</div>';
        console.error('Error:', error);
    } finally {
        // 恢复按钮状态
        generateBtn.disabled = false;
    }
}
