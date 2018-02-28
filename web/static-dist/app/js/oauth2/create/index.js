webpackJsonp(["app/js/oauth2/create/index"],{0:function(e,a){e.exports=jQuery},"04e12e97a64b943320e3":function(e,a,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function r(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,a){for(var t=0;t<a.length;t++){var s=a[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(a,t,s){return t&&e(a.prototype,t),s&&e(a,s),a}}(),c=t("e104a65d9efb9ac573bc"),o=t("b334fd7e4c5a19234db2"),i=s(o),d=t("0fcd3a355c9fe74234e3"),u=t("5eb223de522186da1dd9"),l=s(u),h=function(){function e(){r(this,e),this.$form=$("#third-party-create-account-form"),this.$btn=$(".js-submit-btn"),this.validator=null,this.captchaToken=null,this.smsToken=null,this.init()}return n(e,[{key:"init",value:function(){this.initCaptchaCode(),this.initValidator(),this.changeCaptchaCode(),this.sendMessage(),this.submitForm(),this.removeSmsErrorTip()}},{key:"initValidator",value:function(){var e=this;$(".js-sms-send");this.rules={username:{required:!0,byte_minlength:4,byte_maxlength:18,nickname:!0,chinese_alphanumeric:!0,es_remote:{type:"get"}},password:{required:!0,minlength:5,maxlength:20},confirmPassword:{required:!0,equalTo:"#password"},sms_code:{required:!0,unsigned_integer:!0,rangelength:[6,6]}},$(".js-captcha").hasClass("hidden")||(this.rules.captcha_code=this.getCaptchaCodeRule()),this.validator=this.$form.validate({rules:this.rules,messages:{sms_code:{required:Translator.trans("site.captcha_code.required"),rangelength:Translator.trans("validate.sms_code.message")}}}),$.validator.addMethod("captcha_checkout",function(a,t,s){$(t);if(a.length<5)return void($.validator.messages.captcha_checkout=Translator.trans("oauth.captcha_code_length_tip"));var r=s.data?s.data:{phrase:a},n=s.callback?s.callback:null,c=0,o={captchaToken:e.captchaToken};return l.default.captcha.validate({data:r,params:o,async:!1,promise:!1}).done(function(e){"success"===e.status?c=!0:"expired"===e.status?(c=!1,$.validator.messages.captcha_checkout=Translator.trans("oauth.captcha_code_expired_tip")):(c=!1,$.validator.messages.captcha_checkout=Translator.trans("oauth.captcha_code_error_tip")),n&&n(c)}).error(function(e){}),this.optional(t)||c},Translator.trans("validate.captcha_checkout.message"))}},{key:"initCaptchaCode",value:function(){var e=this,a=$("#getcode_num");if(a.length)return l.default.captcha.get({async:!1,promise:!1}).done(function(t){a.attr("src",t.image),e.captchaToken=t.captchaToken}).error(function(e){}),this.captchaToken}},{key:"sendMessage",value:function(){var e=this,a=$(".js-sms-send"),t=$("#captcha_code");a.length&&a.click(function(a){var s=$(a.target),r={type:"register",mobile:$(".js-account").html(),captchaToken:e.captchaToken,phrase:t.val()};l.default.sms.send({data:r}).then(function(a){e.smsToken=a.smsToken,(0,d.countDown)(120)}).catch(function(a){switch(a.responseJSON.error.code){case 30001:$(".js-captcha").hasClass("hidden")?($(".js-captcha").removeClass("hidden"),(0,i.default)("danger",Translator.trans("oauth.refresh.captcha_code_required_tip")),$("[name='captcha_code']").rules("add",e.getCaptchaCodeRule())):((0,i.default)("danger",Translator.trans("oauth.refresh.captcha_code_tip")),t.val(""),e.initCaptchaCode()),s.attr("disabled",!0);break;case 30002:(0,i.default)("danger",Translator.trans("oauth.send.error_message_tip"));break;case 30003:(0,i.default)("danger",Translator.trans("admin.site.cloude_sms_enable_hint"));break;default:(0,i.default)("danger",Translator.trans("site.data.get_sms_code_failure_hint"))}})})}},{key:"changeCaptchaCode",value:function(){var e=this,a=$("#getcode_num");a.length&&a.click(function(){e.initCaptchaCode()})}},{key:"submitForm",value:function(){var e=this;this.$btn.click(function(a){var t=$(a.target);if(e.validator.form()){t.button("loading");var s={nickname:$("#username").val(),password:$("#password").val(),mobile:$(".js-account").html(),smsToken:e.smsToken,smsCode:$("#sms-code").val(),captchaToken:e.captchaToken,phrase:$("#captcha_code").val()},r=Translator.trans("oauth.send.sms_code_error_tip");$.post(t.data("url"),s,function(e){t.button("reset"),1===e.success?window.location.href=e.url:$(".js-password-error").length||t.prev().addClass("has-error").append('<p id="password-error" class="form-error-message js-password-error">'+r+"</p>")}).error(function(e){t.button("reset"),429===e.status?(0,i.default)("danger",Translator.trans("oauth.register.time_limit")):(0,i.default)("danger",Translator.trans("oauth.register.error_message"))})}}),(0,c.enterSubmit)(this.$form,this.$btn)}},{key:"removeSmsErrorTip",value:function(){$("#sms-code").focus(function(){var e=$(".js-password-error");e.length&&e.remove()})}},{key:"getCaptchaCodeRule",value:function(){var e=this;return{required:!0,alphanumeric:!0,captcha_checkout:{callback:function(a){if(!a){$(".js-sms-send").attr("disabled",!0);var t=e.initCaptchaCode();return e.captchaToken=t,e.captchaToken}$(".js-sms-send").removeAttr("disabled")}}}}}]),e}();a.default=h},"0fcd3a355c9fe74234e3":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.countDown=void 0;var s=t("b334fd7e4c5a19234db2"),r=function(e){return e&&e.__esModule?e:{default:e}}(s),n=$(".js-time-left"),c=$(".js-sms-send"),o=$(".js-fetch-btn-text"),i=(a.countDown=function(e){n.html(e),o.html(Translator.trans("site.data.get_sms_code_again_btn")),(0,r.default)("success",Translator.trans("site.data.get_sms_code_success_hint")),i()},function e(){var a=n.text();n.html(a-1),a-1>0?(c.attr("disabled",!0),setTimeout(e,1e3)):(n.html(""),o.html(Translator.trans("oauth.send.validate_message")),c.removeAttr("disabled"))})},"1d43a4025aadc22df310":function(e,a,t){"use strict";var s=t("04e12e97a64b943320e3");new(function(e){return e&&e.__esModule?e:{default:e}}(s).default)},e104a65d9efb9ac573bc:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=function(e,a){e.keypress(function(e){13==e.which&&(a.trigger("click"),e.preventDefault())})};a.enterSubmit=s}},["1d43a4025aadc22df310"]);