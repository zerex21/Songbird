import {
    renderGallery
} from './gallery.js'

let mainPage = document.querySelector('.main-page')
let quizPage = document.querySelector('.quiz-page')
let galleryPage = document.querySelector('.gallery-page')
let greetingButton = document.querySelector('.greeting-button_submit')
let listQuestions = document.querySelector('.quiz')
let headerPreview = document.querySelector('.header-preview')
let greetingGame = document.querySelector('.greeting-game ')
let footer = document.querySelector('.footer')
let gallery = document.querySelector('.gallery');

let navPages = () => {

    mainPage.addEventListener('click', () => {
    /*     console.log('main') */
        gallery.style.display = 'none'
        greetingGame.style.display = 'block'
        footer.style.display = 'block'
        mainPage.className = 'preview_navigation list-question_active main-page'
        galleryPage.className = 'preview_navigation gallery-page'
        spinner.style.display = 'none'
      /*   gallery.style.opacity = 0 */
    })

    quizPage.addEventListener('click', () => {
        /* gallery.style.opacity = 1 */
        headerPreview.style.display = 'none'
        greetingGame.style.display = 'none'
        listQuestions.style.display = 'block'
        footer.style.display = 'none'
        mainPage.className = 'preview_navigation list-question_active main-page'
        galleryPage.className = 'preview_navigation gallery-page'
        spinner.style.display = 'none'
        /* console.log('quiz') */
        gallery.style.display = 'none'

    })

    let spinner = document.querySelector('.spinner')
    spinner.style.display = 'none'
    gallery.style.opacity = 0
    galleryPage.addEventListener('click', () => {
        spinner.style.display = 'block'

        let loader = () => {

            if (!num) {
                setTimeout(function () {
                    spinner.style.display = 'none'
                    gallery.style.opacity = 1
                }, 17000);
                renderLoad()
            } else {
                spinner.style.display = 'none'
                gallery.style.opacity = 1
            }

            footer.style.display = 'none'
            greetingGame.style.display = 'none'
            gallery.style.display = 'flex'
            mainPage.className = 'preview_navigation main-page'
            galleryPage.className = 'preview_navigation list-question_active gallery-page'


        }

        loader()


      /*   console.log('gallery') */
    })

    greetingButton.addEventListener('click', () => {
        headerPreview.style.display = 'none'
        greetingGame.style.display = 'none'
        listQuestions.style.display = 'block'
        footer.style.display = 'none'
        spinner.style.display = 'none'
       /*  console.log('greetingButton') */
        gallery.style.display = 'none'
       /*  gallery.style.opacity = 0 */

    })
}

let num = 0
let renderLoad = () => {
    renderGallery()
    num = 1
}

export {
    navPages
}