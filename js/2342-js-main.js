// --------------------------------------- GLOBAL FUNCTIONS ----------------------------------
try {
  /**
   * Alert message on form
   *
   * @param {string} elem Element class or id
   * @param {string} msg Message to alert
   * @param {boolean} isShow Show or hide the alert
   */
  function frmMsg(elem, msg, isShow = true) {
    if (isShow) {
      $(`${elem} .card-body p`).html(msg);
      $(elem).removeClass("d-none");
    } else {
      $(elem).addClass("d-none");
    }
  }

  function sendEmail(email_address, message, subject, user) {
    $.post(
      "inc/sendEmail.inc.php",
      {
        email: email_address,
        message: message,
        subject: subject,
        user: user,
      },
      (data) => {}
    );
  }

  /**
   *
   * @param {string} msg Message to alert
   * @param {boolean} type Is alert message an error?
   */
  function alertModal(msg, e_type = false) {
    $("#alertModal .modal-body p").html(msg);
    e_type
      ? ($("#alertModal .modal-title").addClass("text-danger"),
        $("#alertModal .modal-title").removeClass("text-success"),
        $("#alertModal .modal-body").addClass("text-danger"),
        $("#alertModal .modal-body").removeClass("text-success"),
        $("#alertModal .modal-title").html("Error!"),
        $("#alertModal .error-img").removeClass("d-none"),
        $("#alertModal .check-img").addClass("d-none"))
      : ($("#alertModal .modal-title").removeClass("text-danger"),
        $("#alertModal .modal-title").addClass("text-success"),
        $("#alertModal .modal-body").removeClass("text-danger"),
        $("#alertModal .modal-body").addClass("text-success"),
        $("#alertModal .modal-title").html("Success!"),
        $("#alertModal .error-img").addClass("d-none"),
        $("#alertModal .check-img").removeClass("d-none"));
    $("#alertsModal").click();
  }

  function headTo(url = "") {
    location.replace(url);
  }

  function overLoader(isLoad = true) {
    isLoad
      ? ($(".over-loader").removeClass("d-none"),
        setTimeout(() => {
          $(".over-loader").addClass("show"), $("body").addClass("no-scroll");
        }, 10))
      : ($(".over-loader").removeClass("show"),
        $("body").removeClass("no-scroll"),
        setTimeout(() => {
          $(".over-loader").addClass("d-none");
        }, 100));
  }

  function copyToClipboard(text, textCopied) {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the Clipboard API if supported
      navigator.clipboard
        .writeText(text)
        .then(function () {
          console.log("Text copied to clipboard");
        })
        .catch(function (error) {
          console.error("Failed to copy text: ", error);
        });
    } else {
      // Fallback for browsers that don't support the Clipboard API
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // Ensure the textarea is visible
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful
          ? "Text copied to clipboard"
          : "Failed to copy text";
        console.log(msg);
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }

      document.body.removeChild(textarea);
    }

    let initial_ = $(textCopied).html();
    $(textCopied).html("COPIED");
    setTimeout(() => {
      $(textCopied).html(initial_);
    }, 3000);
  }

  function formatNumber(number) {
    // Convert the number to a float and round it to 2 decimal places
    var roundedNumber = parseFloat(number).toFixed(2);

    // Split the number into integer and decimal parts
    var parts = roundedNumber.split(".");
    var integerPart = parts[0];
    var decimalPart = parts[1];

    // Add comma separators for thousands
    var formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted integer and decimal parts
    var formattedNumber = formattedInteger + "." + decimalPart;

    return formattedNumber;
  }

  function randomFloat(min, max, decimals) {
    const randomNum = Math.random() * (max - min) + min;
    const multiplier = Math.pow(10, decimals);
    return Math.round(randomNum * multiplier) / multiplier;
  }
  let _v_blink_ = 1;
  setInterval(() => {
    _v_blink_
      ? ($(".blink").removeClass("d-none"), (_v_blink_ = 0))
      : ($(".blink").addClass("d-none"), (_v_blink_ = 1));
  }, 500);

  function logout() {
    overLoader();
    $.post("inc/logout.inc.php", { logout: 1 }, () => {
      location.reload();
    });
  }

  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 0.99;
  });

  document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 0.99;
  });

  document.addEventListener("gestureend", function (e) {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 0.99;
  });

  $(".btn").attr("data-mdb-ripple-duration", "0");
} catch (e) {
  alert(e);
}
// *************************************** REGISTER ****************************************
try {
  $((f) => {
    $("#main-reg-frm").on("submit", (e) => {
      overLoader();
      e.preventDefault();

      $.post(
        "inc/register.inc.php",
        {
          username: $("#reg-username").val(),
          email: $("#reg-email").val(),
          pass1: $("#reg-pass1").val(),
          pass2: $("#reg-pass2").val(),
          number: $("#reg-number").val(),
          tcs: $("#reg-tcs").is(":checked") ? 1 : 0,
          currency: $("#reg-currency").val(),
          ref: $(".user-ref").html(),
        },
        (data) => {
          if (data == "none") {
            location.reload();
          } else {
            overLoader(false);
            frmMsg(".reg-card", data);
          }
        }
      );
    });
  });

  // ***************************************** LOGIN ********************************
  $((f) => {
    $("#login-frm").on("submit", (e) => {
      overLoader();
      e.preventDefault();

      $.post(
        "inc/login.inc.php",
        {
          username: $("#log-username").val(),
          pass: $("#log-password").val(),
          rem: $("#log-rem").val(),
        },
        (data) => {
          if (data == "none") {
            location.reload();
          } else {
            overLoader(false);
            frmMsg(".log-card", data);
          }
        }
      );
    });
  });
} catch (error) {
  alert(error);
}

try {
  var _crt = 0;
  function consoles(newData = "", data_type = "success") {
    let dt1 = data_type;
    if (data_type == "error" || data_type == "sys") {
      dt1 = "danger";
    } else if (
      data_type == "ping" ||
      data_type == "server" ||
      data_type == "end"
    ) {
      dt1 = "warning";
    } else if (data_type == "message") {
      dt1 = "info";
    }
    $(".main-console .blink-cursor").remove();
    let _data = $(
      `<p class="d-inline c-log-${_crt++}"><b class="text-${dt1}" style="font-weight:bold !important">-<span class="text-white">[</span>${data_type}<span class="text-white">]</span>-</b><span  class="crt-${
        _crt - 1
      }" style="ms-2"></span></p><br>`
    );
    $(".main-console").append(_data);
    $(`.crt-${_crt - 1}`).text(newData);
    // let _cursor = $('<span class="blink-cursor blink">_</span>');
    // $(`.c-log-${_crt - 1}`).append(_cursor);
    var __div = $(".console");

    // Scroll to the bottom of the div
    __div.scrollTop(__div.prop("scrollHeight"));
  }

  function toTop() {
    $("html, body, .modal").animate({ scrollTop: 0 }, "fast");
  }

  function clearConsole() {
    $(".console").html("");
    let clearBtn = $(
      `<div class="btn position-absolute btn-secondary clear-btn btn-sm" onclick="clearConsole()" data-mdb-ripple-duration="0">Clear</div>`
    );
    // $(".console").append(clearBtn);
    consoles("console cleared!", "info");
  }

  // **************************************** CMD ***************************************

  var _retries = 3,
    sys_ready = false,
    recon_time = 10 * 1000;
  function isInternet() {
    return navigator.onLine;
  }

  function disableExecute(isDisable = true) {
    isDisable
      ? ($("#main-execute").addClass("btn-secondary"),
        $("#main-execute").prop("disabled", true))
      : ($("#main-execute").removeClass("btn-secondary"),
        $("#main-execute").prop("disabled", false));
  }

  function initializeConsole() {
    if (_retries == 3) consoles("checking internet connection...", "ping");
    setTimeout(() => {
      if (isInternet()) {
        consoles(`stable connection established`, "success");
        setTimeout(() => {
          consoles("system ready for trade execution!", "info");
          if ($("#default-state").text().trim() == "1") {
            disableExecute(false);
          }
          sys_ready = true;
          setTimeout(() => {
            // let newIntv = setInterval(() => {
            //   if (isInternet()) {
            //     consoles("maintaining standby connection", "info");
            //   } else {
            //     consoles("internet connection lost", "error");
            //     setTimeout(() => {
            //       consoles("retrying...", "warning");
            //       // initializeConsole()
            //     }, 500);
            //     clearInterval(newIntv);
            //   }
            // }, 10000);
          }, recon_time);
          _retries = 3;
        }, 400);
      } else {
        consoles("unstable internet connection", "sys");
        if (_retries > 0) {
          _retries--;
          setTimeout(() => {
            consoles("re-establishing connection ...", "ping");
            setTimeout(() => {
              $.post("inc/cmd.inc.php", function () {
                initializeConsole();
              })
                .done(function () {
                  // initializeConsole();
                })
                .fail(function () {
                  if (_retries == 1) {
                    consoles(
                      "internet connection failed. refresh page",
                      "error"
                    );
                    setTimeout(() => {
                      consoles("exiting console", "end");
                      _retries = 3;
                    }, 300);
                  } else {
                    consoles("re-establishing connection ...", "ping");
                    setTimeout(() => {
                      initializeConsole();
                    }, recon_time);
                  }
                })
                .always(function () {
                  // alert( "finished" );
                });
            }, recon_time);
          }, 400);
        } else {
          consoles("internet connection failed. refresh page", "error");
          setTimeout(() => {
            consoles("exiting console", "end");
            _retries = 3;
          }, 300);
        }
      }
    }, 1000);
  }
  var isThread = false,
    wasThread = false;
  function mainExecute() {
    disableExecute();
    // clearConsole();
    toTop();
    setTimeout(() => {
      if (isInternet()) {
        isThread ? void 0 : consoles("loading market data...", "info");
        setTimeout(() => {
          isThread ? void 0 : consoles("attempting trade exection..", "info");
          $.post(
            "inc/cmd.inc.php",
            {
              execute: "standard",
            },
            (data) => {
              if (data == "none") {
                consoles("an unknown error occured", "error");
                disableExecute(false);
              } else if (data == "prog") {
                consoles(
                  "execution initiated, may take 2-4 hours to finish",
                  "success"
                );
                disableExecute(true);
              } else if (data == "progs") {
                consoles("previous execution still in progress", "info");
                disableExecute(true);
              } else if (data.includes("exec|")) {
                let exec_val = data.split("|")[1];
                if (exec_val == "done") {
                  isThread = false;
                  if (!wasThread) {
                    consoles("executing trade on free stock...", "trade");
                    setTimeout(() => {
                      consoles(
                        "awaiting profits from executed trades...",
                        "success"
                      );
                    }, 2000);
                  } else {
                    consoles(
                      "awaiting profits from executed trades...",
                      "success"
                    );
                  }
                  // disableExecute(true);
                } else {
                  isThread = true;
                  wasThread = true;
                  consoles(`executing trade on ${exec_val} stock...`, "trade");
                  setTimeout(() => {
                    mainExecute();
                  }, 400);
                }
              } else {
                consoles(data, "error");
                disableExecute(false);
              }
            }
          );
        }, randomFloat(1000, 3000, 0));
      } else {
        consoles("unstable internet connection", "error");
        disableExecute(false);
        if (_retries > 0) {
          _retries--;
          setTimeout(() => {
            consoles("re-establishing connection ...", "ping");
            setTimeout(() => {
              $.post("inc/cmd.inc.php", function () {
                var __k = 1;
              })
                .done(function () {
                  mainExecute();
                })
                .fail(function () {
                  if (_retries == 1) {
                    consoles(
                      "could not place trade <poor internet connection>",
                      "error"
                    );
                    disableExecute(false);
                    setTimeout(() => {
                      consoles("aborting trade", "end");
                      _retries = 3;
                    }, 300);
                  } else {
                    consoles("unstable internet connection", "error");
                    consoles("re-establishing connection ...", "ping");
                    setTimeout(() => {
                      mainExecute();
                    }, recon_time);
                  }
                })
                .always(function () {
                  // alert( "finished" );
                });
            }, recon_time);
          }, 1000);
        } else {
          consoles("could not place trade <poor internet connection>", "error");
          disableExecute(false);
          _retries = 3;
        }
      }
    }, 10);
    // <p class="d-flex"><span class="text-warning">[omr]</span><span
    // style="margin-left: 5px;">attempting
    // new trade
    // execution...</span></p>
  }
} catch (e) {
  alert(e);
}

// ********************************************* TO PACKAGES ********************************

function toPkg() {
  $("html, body").animate(
    {
      scrollTop: $(".first-package").offset().top - 60,
    },
    100
  );
}

// ************************************************* UPGRADE *********************************
$(document).ready(function () {
  // When a checkbox is clicked
  $('input[name="pay-method"]').on("click", function () {
    // Uncheck all checkboxes except the clicked one
    $('input[name="pay-method"]').not(this).prop("checked", false);

    // Disable unchecking the clicked checkbox
    $(this).prop("checked", true);
    let pm = $('input[name="pay-method"]:checked').val();
    $(`.detail-section`).addClass("d-none");
    $(`.${pm}-section`).removeClass("d-none");
  });
});
$(document).ready(function () {
  // When a checkbox is clicked
  $('input[name="with-method"]').on("click", function () {
    $('input[name="with-method"]').not(this).prop("checked", false);
    $(this).prop("checked", true);
    let pm = $('input[name="with-method"]:checked').val();
  });
});

function upgrades(pkg) {
  overLoader();
  $.post(
    "inc/upgrade.inc.php",
    {
      pkg: pkg,
    },
    (data) => {
      overLoader(false);
      if (data == "none") {
        alert("done");
      } else if (data.includes("{")) {
        // alert("Processed");
        data = JSON.parse(data);
        $(".pkg-title").html(pkg.toUpperCase());
        $(".pkg-amount").html(formatNumber(data["cost"]));
        $(".pkg-ref").val(data["ref"]);
        $(".pkg-ref").html(data["ref"]);
        $("#pkg-zar-amount").val(parseFloat(data["cost"]).toFixed(2));
        $("#pkg-name").val(pkg.toUpperCase() + " Package");
        $("#pay-id").val(data["pay_id"]);
        $(".pkg-modal-start").click();

        // sendEmail('admins', '')
      } else {
        frmMsg(".pkg-card", data, true);
      }
    }
  );
}

// *********************************************** WITHDRAWAL ********************************

$("#main-with-amount").on("input", (f) => {
  $("#main-with-amount").val(
    $("#main-with-amount")
      .val()
      .replace(/[^0-9.]/g, "")
  );
  $(".with-type-amount").html(
    formatNumber(
      parseFloat(
        $("#main-with-amount").val().trim() == ""
          ? "0.00"
          : $("#main-with-amount").val()
      )
    )
  );
});

$((f) => {
  $("#with-frm").on("submit", (e) => {
    overLoader();
    e.preventDefault();
    $.post(
      "inc/withdraw.inc.php",
      {
        method: $('input[name="with-method"]:checked').val(),
        amount: $("#main-with-amount").val(),
        bank: $("#with-bank").val(),
        acc_number: $("#with-acc-number").val(),
        acc_type: $("#with-acc-type").val(),
        acc_holder: $("#with-acc-holder").val(),
        isSave: $("#saveBanking").is(":checked") ? "true" : "false",
      },
      (data) => {
        overLoader(false);
        if (data == "none") {
          headTo("withdrawals.php");
        } else {
          toTop();
          frmMsg(".with-card", data, true);
        }
      }
    );
  });
});

// *************************************************** RESET PASS **************************************
function reset_pass(user) {
  overLoader();
  $.post(
    "inc/reset_pass.inc.php",
    {
      user: user,
    },
    (data) => {
      if (data == "none") {
        location.replace("otp.php");
      } else {
        overLoader(false);
        frmMsg(".reset-card", data, true);
      }
    }
  );
}
// *************************************************** SEND OTP **************************************
function send_otp(otp, new_pass, old_pass) {
  overLoader();
  $.post(
    "inc/new_pass.inc.php",
    {
      otp: otp,
      pass1: new_pass,
      pass2: old_pass,
    },
    (data) => {
      if (data == "none") {
        location.replace("page_login.php");
      } else {
        overLoader(false);
        frmMsg(".reset-card", data, true);
      }
    }
  );
}

// ************************************** INTERNAL PAYMENTS **********************************

try {
  function payWith(paym) {
    overLoader();
    $.post(
      "inc/pay_with.inc.php",
      {
        pay: paym,
      },
      (data) => {
        if (data == "none") {
          headTo("./?payment=success");
        } else {
          overLoader(false);
          toTop();
          frmMsg(".pkg-card", data, true);
        }
      }
    );
  }
} catch (error) {}

// ************************************************** ONLOAD ********************************
try {
  function convertPhpDateToJs(phpDateString) {
    var parts = phpDateString.split(" ");
    var datePart = parts[0];
    var timePart = parts[1];

    var dateParts = datePart.split("-");
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1;
    var day = parseInt(dateParts[2]);

    var timeParts = timePart.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);

    var jsDate = new Date(year, month, day, hours, minutes, seconds);

    return jsDate;
  }
  window.onload = () => {
    initializeConsole();
    var timerElements = document.querySelectorAll(
      "[timer-date-start][timer-date-end][timer-in]"
    );
    if (!timerElements.length) return;

    timerElements.forEach(function (timerElement) {
      var startDate = new Date(
        convertPhpDateToJs(timerElement.getAttribute("timer-date-start"))
      );
      var isIn = timerElement.getAttribute("timer-in") == "true" ? true : false;
      var endDate = new Date(
        convertPhpDateToJs(timerElement.getAttribute("timer-date-end"))
      );
      // alert(startDate);
      // alert(endDate);
      var distance = endDate - startDate;

      var interval = setInterval(function () {
        distance -= 1000; // decrement by 1 second

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML =
          (isIn ? "IN " : "") +
          (days <= 0 ? "" : (days < 10 ? "" + days : days) + "D : ") +
          (hours <= 0 && days <= 0
            ? ""
            : (hours < 10 ? "0" + hours : hours) + "H : ") +
          (days <= 0 && hours <= 0 && minutes <= 0
            ? ""
            : (minutes < 10 ? "0" + minutes : minutes) + "M : ") +
          (seconds < 10 ? "0" + seconds : seconds) +
          "S";

        if (distance <= 0) {
          clearInterval(interval);
          timerElement.innerHTML = "NOW";
        }
      }, 1000);
    });
  };
} catch (error) {
  alert(error);
}
