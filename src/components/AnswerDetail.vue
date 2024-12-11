
    <template>
        <div class="flex min-h-screen">
            <!-- 侧边栏 -->
            <div class="w-64 bg-gray-800 text-white p-4">
                <div class="flex items-center mb-4">
                <!-- <img src="/path-to-your-logo.svg" alt="Logo" class="h-8" /> -->
                <h1 class="text-xl font-bold ml-2">LingYan</h1>
                </div>
                <nav class="space-y-2">
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">概览</a>
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">动态</a>
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">项目</a>
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">数据</a>
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">专栏</a>
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">比赛</a>
                <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">活动</a>
                </nav>
            </div>
        
            <!-- 主内容区域 -->
            <div class="flex-1 p-4">
                <div class="max-w-3xl mx-auto">
                <div class="bg-white shadow-lg rounded-lg p-4">
                    <div class="flex items-center mb-4">
                    <div class="mr-4">
                        <img class="h-12 w-12 rounded-full" src="https://via.placeholder.com/150" alt="头像">
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold">Windir</h2>
                        <p class="text-gray-500">一枚热爱插画的视觉设计师</p>
                    </div>
                    </div>
                    <div class="mb-4">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">编辑简介</button>
                    </div>
                    <div class="mb-4">
                    <h3 class="font-semibold mb-2">简介</h3>
                    <p>这里是用户的简介，可以包含一些关于用户的详细信息。</p>
                    </div>
                    <div class="mb-4">
                    <h3 class="font-semibold mb-2">技能</h3>
                    <div class="flex space-x-2">
                        <span class="px-2 py-1 bg-gray-200 rounded">技能1</span>
                        <span class="px-2 py-1 bg-gray-200 rounded">技能2</span>
                        <span class="px-2 py-1 bg-gray-200 rounded">技能3</span>
                    </div>
                    </div>
                    <div class="mb-4">
                    <h3 class="font-semibold mb-2">统计数据</h3>
                    <div class="flex space-x-4">
                        <div class="flex-1 text-center">
                        <h3 class="text-2xl font-bold">100</h3>
                        <p class="text-gray-500">关注</p>
                        </div>
                        <div class="flex-1 text-center">
                        <h3 class="text-2xl font-bold">50</h3>
                        <p class="text-gray-500">粉丝</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </template>
        
        <script>
        export default {
            name: 'LingYan',
        };
        </script>
        
        <style scoped>
        /* 这里可以添加一些自定义的TailwindCSS颜色和字体样式 */
        </style>