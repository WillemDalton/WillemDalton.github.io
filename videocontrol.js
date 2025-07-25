let projects = document.querySelectorAll(".project")

const observer = new IntersectionObserver((projects) => {
    for( let project of projects )
    {
        let video = project.target.querySelector("video");
            
        if (project.isIntersecting)
        {
            project.target.classList.add("focus");
            video.play();
        }
        else
        {
            project.target.classList.remove("focus");
            video.pause();
        }
    }
    },
    {
    threshold: 0.5,
    });

for( let project of projects) 
{
    observer.observe(project);
}
