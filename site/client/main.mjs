if (typeof document !== 'undefined') {
  window.onload = () => {
    // Get Data
    function getData(taskData) {
      let link = ``;
      $.ajax({
        url: `../../data/server.json`,
        method: `GET`,
        contentType: `application/json`,
        success: res => {
          link = `http://127.0.0.1:${res['node']}/${taskData}`;
          $.ajax({
            url: link,
            method: `GET`,
            contentType: `application/json`,
            success: res => {
              console.log(res);
            }
          })
        }
      })
    }

    // Post Data
    function postData(taskData, bodyData) {
      let link = ``;
      $.ajax({
        url: `../../data/server.json`,
        method: `GET`,
        contentType: `application/json`,
        success: res => {
          link = `http://127.0.0.1:${res['node']}/${taskData}`;
          $.ajax({
            url: link,
            method: `POST`,
            contentType: `application/json`,
            data: JSON.stringify( bodyData ),
            success: res => {
              console.log(res);
            }
          })
        }
      })
    }

    // ToolTips
    $('[data-toggle="tooltip"]').tooltip();
  
    // Hints
    let hint = $(".hint");
  
    // Dynamic BG
    let bg1 = $("#bg1");
    let bg2 = $("#bg2");
    let bg3 = $("#bg3");
    let bg4 = $("#bg4");
  
    function background() {
        bg1.removeClass("showTop");
        bg1.addClass("show");
    
        setTimeout(() => {
            bg2.addClass("show");
            setTimeout(() => {
                bg1.removeClass("show");
            }, 600);
        }, 6000);
      
        setTimeout(() => {
            bg3.addClass("show");
            setTimeout(() => {
                bg2.removeClass("show");
            }, 600);
        }, 12000);
      
        setTimeout(() => {
            bg4.addClass("show");
            setTimeout(() => {
                bg3.removeClass("show");
            }, 600);
        }, 18000);
      
        setTimeout(() => {
            bg1.addClass("showTop");
            setTimeout(() => {
                bg4.removeClass("show");
            }, 600);
        }, 24000);
    }
    setInterval(background(), 24000);
    
    // Rating
    let RatingStars = document.querySelector(".P1-RatingStars");
    let MainRating = document.querySelector(".P1-MainRate");
    let Rating = 4.5;
    MainRating.innerHTML = Rating;

    if (Rating <= 0.5 && Rating > 0) {
      RatingStars.innerHTML = '<i class="fa-solid fa-star-half-stroke star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 1 && Rating > 0.5) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 1.5 && Rating > 1) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-solid fa-star-half-stroke star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> '
    } else if (Rating <= 2 && Rating > 1.5) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 2.5 && Rating > 2) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-solid fa-star-half-stroke star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 3 && Rating > 2.5) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 3.5 && Rating > 3) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-solid fa-star-half-stroke star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 4 && Rating > 3.5) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-regular fa-star star-yellow"></i>'
    } else if (Rating <= 4.5 && Rating > 4) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa-solid fa-star-half-stroke star-yellow" aria-hidden="true"></i>'
    } else if (Rating <= 5 && Rating > 4.5) {
      RatingStars.innerHTML = '<i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i> <i class="fa fa-star star-yellow" aria-hidden="true"></i>'
    }

    // Copy Phone
    $(".P1-Number").click(() => {
        navigator.clipboard.writeText('+79146162014')
        hint.addClass("show");
        hint.html('<i class="fa fa-check" aria-hidden="true" style="color: rgb(70, 240, 40);"></i> Скопировано');
        setTimeout(() => {
            hint.removeClass("show");
        }, 1000);
    })
  
    // Copy Location
    $(".P2-LocationText").click(() => {
      navigator.clipboard.writeText('Чигири, Европейская улица, 7/3')
      hint.addClass("show");
      hint.html('<i class="fa fa-check" aria-hidden="true" style="color: rgb(70, 240, 40);"></i> Скопировано');
      setTimeout(() => {
          hint.removeClass("show");
      }, 1000);
    })

    $(".AccBt").click(() => {
      $(".Authorization").addClass("show");
      $(".ConfirmMail").removeClass("cl");
      $(".ConfirmMailContent").removeClass("cl");
      $(".Aut-Choose").removeClass("cl");
      $(".Reg-Choose").removeClass("cl");
      setTimeout(() => {
        $(".Authorization").addClass("showBG");
      }, 200);
    })

    $(".Aut-Back").click(() => {
      $(".Authorization").removeClass("showBG");
      setTimeout(() => {
        $(".Authorization").removeClass("show");
      }, 200);
    })

    $(".P3-MasterCategory").removeClass("active");
    $(".P3-MasterCategory-1").addClass("active");
    $(".P3-MastersArray").removeClass("cl");
    $(".P3-MastersArray-1").addClass("cl");

    $(".P3-MasterCategory-1").click(() => {
      $(".P3-MasterCategory").removeClass("active");
      $(".P3-MasterCategory-1").addClass("active");
    
      $(".P3-MastersArray").removeClass("cl");
      $(".P3-MastersArray-1").addClass("cl");
    })

    $(".P3-MasterCategory-2").click(() => {
      $(".P3-MasterCategory").removeClass("active");
      $(".P3-MasterCategory-2").addClass("active");
    
      $(".P3-MastersArray").removeClass("cl");
      $(".P3-MastersArray-2").addClass("cl");
    })

    document.querySelectorAll(".Checkbox").forEach(i => {
      i.onclick = function changeCl() {
        i.firstElementChild.classList.add("checked");
          i.onclick = () => {
            i.firstElementChild.classList.remove("checked");
              i.onclick = () => {
                changeCl();
              }
          }
      }
    })

    $(".RegLink").click(() => {
      $(".Aut-Choose").toggleClass("cl");
      $(".Reg-Choose").toggleClass("cl");
    })

    // Authorization
    $(".EnterButton").on("click", (e) => {
      e.preventDefault();

      let AutLogin = $("#AutLogin").val();
      let AutPassword = $("#AutPassword").val();
      let REQ = {
        "login" : AutLogin,
        "password" : AutPassword
      };
      postData('authorization', REQ);
    })

    // Registration
    $(".RegButton").on("click", (e) => {
      e.preventDefault();

      let RegLogin = $("#RegLogin").val();
      let RegPassword = $("#RegPassword").val();
      let RegAcceptPassword = $("#RegAcceptPassword").val();
      let REQ = {
        "login" : RegLogin,
        "password" : RegPassword
      };

      if (RegPassword === RegAcceptPassword) {
        if (toString(RegPassword).length >= 4) {
          postData('registration', REQ);
          $(".ConfirmMail").addClass("cl");
          $(".ConfirmMailContent").addClass("cl");
          $(".Aut-Choose").addClass("cl");
          $(".Reg-Choose").removeClass("cl");
        } else{
          alert("Пароль не может быть меньше 4 символов!");
        }
      } else {
        alert("Пароли не совпадают!");
      }
    })
  }
}