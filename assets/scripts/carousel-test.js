// Activate Carousel
$("#carouselExampleIndicators").carousel();
    
// Enable Carousel Indicators
$(".carousel-indicators li[data-slide-to=0]").click(function(){
    $("#carouselExampleIndicators").carousel(0);
});
$(".carousel-indicators li[data-slide-to=1]").click(function(){
    $("#carouselExampleIndicators").carousel(1);
});
$(".carousel-indicators li[data-slide-to=2]").click(function(){
    $("#carouselExampleIndicators").carousel(2);
});
$(".carousel-indicators li[data-slide-to=3]").click(function(){
    $("#carouselExampleIndicators").carousel(3);
});
$(".carousel-indicators li[data-slide-to=4]").click(function(){
    $("#carouselExampleIndicators").carousel(4);
});
    

// Enable Carousel Controls
$(".carousel-control-prev").click(function(){
$("#carouselExampleIndicators").carousel("prev");
});
$(".carousel-control-next").click(function(){
$("#carouselExampleIndicators").carousel("next");
});