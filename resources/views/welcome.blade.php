@extends('layouts.app')


@section('content')



<section class="m-scene content">


<div id="transferCtrl">

<div style="margin-top: 10rem;  "class="container">
<div>
<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable>
</div>
</div>



</div>

<br><br><br>
</section>



<script src="/js/transferCtrl.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
<!-- CDNJS :: Sortable (https://cdnjs.com/) -->
<script src="//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js"></script>
<!-- CDNJS :: Vue.Draggable (https://cdnjs.com/) -->
<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>
@endsection