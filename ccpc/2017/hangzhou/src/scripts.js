jQuery(document).ready(function($)
	{



		$(window).resize(function() {
			
			//var windowWidth = $(window).width();
			//var width = $('#post-grid-7 .grid-items').width();
			
			//$('.post-grid-debug').html(width+' - '+windowWidth);
			
		});



		$(document).on('keyup', '.post-grid .nav-search .search', function()
			{
				var keyword = $(this).val();
				var grid_id = $(this).attr('grid_id');				
				
				if(keyword.length>3){
					$(this).addClass('loading');
					
					$('.pagination').fadeOut();
					
					$.ajax(
						{
					type: 'POST',
					context: this,
					url:post_grid_ajax.post_grid_ajaxurl,
					data: {"action": "post_grid_ajax_search", "grid_id":grid_id,"keyword":keyword,},
					success: function(data)
							{	
								
								$('.post-grid .grid-items').html(data);
								$(this).removeClass('loading');
		
							}
						});

	
					
					}
				
			})





		$(document).on('click', '.post-grid .nav-filter .filter', function()
			{
				$('.post-grid .nav-filter .filter').removeClass('active');
				
				
				if($(this).hasClass('active'))
					{
						//$(this).removeClass('active');
					}
				else
					{
						$(this).addClass('active');
					}
				
			})

		$(document).on('click', '.post-grid .load-more', function()
			{
				
				
				var paged = parseInt($(this).attr('paged'));
				var per_page = parseInt($(this).attr('per_page'));
				var grid_id = parseInt($(this).attr('grid_id'));
				var terms = $('#post-grid-'+grid_id+' .nav-filter .filter.active').attr('terms-id');
				
				//alert(terms);
				
				if(terms == null || terms == '')
					{
						terms = '';
					}
						
				$(this).addClass('loading');

				
				$.ajax(
					{
				type: 'POST',
				context: this,
				url:post_grid_ajax.post_grid_ajaxurl,
				data: {"action": "post_grid_ajax_load_more", "grid_id":grid_id,"per_page":per_page,"paged":paged,"terms":terms,},
				success: function(data)
						{	
						
							//$('.grid-items').append(data);
							
							
							var $grid = $('#post-grid-'+grid_id+' .grid-items').masonry({});				
							
							
							
							
							  // append items to grid
								$grid.append( data )
								// add and lay out newly appended items
								.masonry( 'appended', data, true );
								
								
								$grid.masonry( 'reloadItems' );
								$grid.masonry( 'layout' );
	$grid.masonry('destroy');
	
	$('#post-grid-'+grid_id+' .grid-items').masonry({});
	
	
							$(this).attr('paged',(paged+1));
							
							if($(this).hasClass('loading'))
								{
									$(this).removeClass('loading');
								}
							
						}
					});

				//alert(per_page);
			})

		
		

	});	






