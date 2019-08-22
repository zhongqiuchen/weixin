<template>
    <div class="back">
        msg from back: {{msg}}
    </div>
</template>

<script>
export default {
    name:"Back",
    data(){
        return {
            msg:""
        }
    },
    created(){
        console.log("back created!");
        this.axios.get('apis/people').then(res => {
            console.log("response: ");
            console.log(res.data);
            this.msg = res.data;
        })
    }
}
</script>

