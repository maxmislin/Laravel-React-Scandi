@extends('layouts.app')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
    <h1 class="h2">Product Add</h1>
</div>
  
 <form action="{{ route('apply-form') }}" method="post">
    @csrf

	  <div class="col-md-3 mb-3">  
      <label for="sku">SKU</label>
      <input type="text" class="form-control" name="sku" placeholder="SKU" required="">
      <div class="invalid-feedback">
        Please enter SKU.
      </div>
    </div>

		<div class="col-md-3 mb-3">
      <label for="name">Name</label>
      <input type="text" class="form-control" name="name" placeholder="Name" required="">
      <div class="invalid-feedback">
        Please enter Name.
      </div>
    </div>

		<div class="col-md-3 mb-3">
      <label for="price">Price</label>
      <input type="text" class="form-control" name="price" placeholder="100 $" required="">
      <div class="invalid-feedback">
        Please enter price.
      </div>
    </div>

		<div class="col-md-2 mb-3">
	    <label>Type Switcher</label>
			<select class="browser-default custom-select" id="switcher" name="switcher">
      @foreach($data as $category)
				<option value="{{$category->name}}">{{$category->name}}</option>
      @endforeach
			</select>
	  </div>
            
    <div class="col-md-3 mb-3" id="divid">
    
    </div>

    <div class="col-md-3 mb-3">
      <button type="submit" class="btn btn-sm btn-outline-secondary pl-5 pr-5 pt-2">
        <h6>Save<h6>
      </button>
    </div>
  </form>


  <script type="text/javascript">
    var my_var1 = <?php echo json_encode($data) ?>;
    var my_var2 = <?php echo json_encode($data1) ?>;
  </script>
  <script type="text/javascript" src="/js/app.js">
  </script>
@endsection