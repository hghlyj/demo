<template>
    <section id="tinymce-editor"></section>
</template>
<script>
import './tinymce.min.js'
import './themes/silver/theme.min.js'
import './langs/zh_CN'
import './plugins/preview/plugin.min.js'
export default {
    props:{
        value:{
        type:String,
        default:'我是默认值'
        }
    },
    mounted(){
        tinymce.init({
            selector:'#tinymce-editor',
            language:'zh_CN',
            // 菜单栏
            // menubar:'bar1 bar2',
            // menu:{
            //     bar1:{title:'菜单栏1',items:'copy paste preview'},
            //     bar2:{titel:'菜单栏2',item:'cut preview'},
            // },
            // 工具栏
            // toolbar:'undo redo',
            // 插件  preview:预览插件
            plugins:'preview',
            //监听tinymce 初始化完成事件
            setup:(editor)=>{
                editor.on('init',(e)=>{
                    editor.setContent(this.value)
                })
            },
            //监听input 和change事件，实时更新value
            init_instance_callback:(editor)=>{
                editor.on('input',(e)=>{
                    this.$emit('input',e.target.innerHTML);
                });
                editor.on('change',(e)=>{
                    this.$emit('input',e.level.content)
                })
            }
        })
    },
}
</script>

<style laneg="less" scoped>
@import url(./skins/ui/oxide/skin.min.css);
</style>