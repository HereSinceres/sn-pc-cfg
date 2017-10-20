<div class="component-list cmn-clearfix">
    <div class="component-list__item J-element-can-drag" v-for='item in comlib' v-on:click='addToPaint(item)'  >
        <div class="component-list__item__icon">
            <i v-bind:class="item.icon"></i>
        </div>
        <div class="component-list__item__name">
            {{item.name}}
        </div>
    </div>
</div>