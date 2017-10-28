<div>
    <div class="sidebar-form">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." v-model='searchtxt'>
        </div>
    </div>
    <div class="component-list " v-if='allComList' v-for="(value, key) in allComList">
        <div class="group-head">{{key}}</div> 
        <div class="clearfix group-body">
            <div class="component-list__item J-element-can-drag" v-for='item in value' v-on:click='addToPaint(item)' v-bind:class="{'active':item.isActive}"
                v-if='search(item)'> 
                <div class="component-list__item__icon">
                    <i v-bind:class="item.icon"></i>
                </div>
                <div class="component-list__item__name">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</div>