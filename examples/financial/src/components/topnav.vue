<template>
    <nav id="topbar" class="navbar navbar-fixed">
        <div class="navbar-brand topnav-left">
            <div class="navbar-item">
                <span>&nbsp;
                    <b>FINANCIAL</b>
                </span>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'topnav'
    }
</script>

<style scoped>
    .navbar-fixed { 
        top:0; z-index:250; position:fixed; width:100%;
        background-color: #525252;
        -webkit-box-shadow: 0px 1px 3px 0px rgba(64,59,64,1);
        -moz-box-shadow: 0px 1px 3px 0px rgba(64,59,64,1);
        box-shadow: 0px 1px 3px 0px rgba(64,59,64,1);
    } 
</style>