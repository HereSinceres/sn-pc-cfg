<aside class="control-sidebar control-sidebar-dark">
    <ul class="nav nav-stacked">
        <li v-for='item in comlib' v-on:click='addToPaint(item)'>
            <a>  {{item.desc}} 
                 <span class="pull-right fa fa-plus"> 
                </span>
            </a>
        </li>
    </ul>
</aside>