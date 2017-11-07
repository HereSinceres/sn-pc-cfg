<div class="J-wrapper-container">
    <svg xmlns="http://www.w3.org/2000/svg" class="J-wrapper" style="position:relative">
        <defs>
            <circle id="point-handle"
                r="3" x="0" y="0"
                stroke-width="2"
                fill="#808080"
                fill-opacity="0.8"
                stroke="#808080"/>
        </defs>
    </svg>
    <div class="context-menu ">
        <ul class="dropdown-menu" role="menu">
            <li>
                <a tabindex="-1" v-on:click='tool_del'>删除</a>
            </li>
            <li>
                <a tabindex="-1" v-on:click='tool_set'>设置</a>
            </li>
            <li>
                <a tabindex="-1" v-on:click='tool_copy'>复制</a>
            </li> 
        </ul>
    </div>
</div>