$(document).ready(function() {
    // Resume fade in and description display
    
    let previousDescription = 'resumeDescPopeyes';
    let previousExperienceTarget = document.getElementById('resumeDescPopeyes');
    let targetContainer = $(document.getElementById('resumeContainerDiv'));

    $(document.getElementsByClassName('resumeDescPopeyes')).fadeIn(500);
    $(document.getElementById('resumeDescPopeyes')).css('background-color', 'rgb(207, 186, 118)')
    $(document.getElementById('resumeDescPopeyes')).css('border-right', 'none')
    $(targetContainer).css('background-color', 'rgb(207, 186, 118)')
    
    $('.resumeExperienceSelector').bind('click', (e) => {
        descTarget = $(e.target).attr('id');
        $(document.getElementsByClassName(previousDescription)).toggle();
        $(previousExperienceTarget).css('background-color', 'inherit')
        $(previousExperienceTarget).css('border-right', 'solid 1px')
        $(e.target).css('background-color', 'rgb(207, 186, 118)')
        $(e.target).css('border-right', 'none')
        $(targetContainer).css('background-color', 'rgb(207, 186, 118)')
        $(document.getElementsByClassName(descTarget)).fadeIn(500);
        previousDescription = descTarget;
        previousExperienceTarget = e.target; 
    });
});


//make button darker when clicked
$(document).ready(function() {
    $('.gameSelectButton').bind('click', (e) => {
        $(e.target).css('background-color', 'rgb(207, 168, 40)');
    });
});

//Better mobile menu display
$(document).ready(function() {
    $('#navicon').bind('click', (e) => {
        $(document.getElementById('permNavLinks')).fadeToggle()
    })

    $('section').bind('click', (e) => {
        const mediaQueryMobile = window.matchMedia('(max-width: 481px)');
        
        if(mediaQueryMobile.matches){
            $(document.getElementById('permNavLinks')).fadeOut(300)
        }
        
    })
});