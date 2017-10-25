<div>
    <div class="sidebar-form">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." v-model='searchtxt'>
            <span class="input-group-btn">
                        <button  class="btn btn-flat" v-on:click='search'>
                          <i class="fa fa-search"></i>
                        </button>
            </span>
        </div>
    </div>
    <div class="component-list cmn-clearfix" v-if='comlib'>
        <div class="component-list__item J-element-can-drag" v-for='item in comlib' v-on:click='addToPaint(item)' v-bind:class="{'active':item.isActive}">
            <div class="component-list__item__icon">
                <i v-bind:class="item.icon"></i>
            </div>
            <div class="component-list__item__name">
                {{item.name}}
            </div>
        </div>
    </div>
</div>