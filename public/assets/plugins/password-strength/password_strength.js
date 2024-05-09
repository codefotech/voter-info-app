/*
This plugin use jQuery Widget Factory because such approach allows to build complex, stateful plugins based on object-oriented principles.
If you prefer a lightweight implementation which not use Widget Factory and not depend from jQuery UI you can use password_strength_lightweight.js

Dependencies:
1. jQuery
2. jQuery UI
*/
;(function ( $, window, document, undefined ) {
    var upperCase = new RegExp('[A-Z]');
    var lowerCase = new RegExp('[a-z]');
    var numbers = new RegExp('[0-9]');
    var specialchars = new RegExp('([~,`,!,@,#,$,%,^,&,*,(,),_,\',\\,/,+,=,{,},:,;,",.,?,-])');

    $.widget( "namespace.strength_meter" , {

        //Options to be used as defaults
        options: {
            strengthWrapperClass: 'strength_wrapper',
            inputClass: 'strength_input',
            strengthMeterClass: 'strength_meter',
            toggleButtonClass: 'button_strength',

            showPasswordText: 'Show Password',
            hidePasswordText: 'Hide Password'
        },

        _create: function () {
            var
                options = this.options;

            //this object contain all main inner elements which will be used in strength meter.
            this.content = {};
            this.content.$textInput = this.element.find('input[type="text"]');
            this.content.$passwordInput = this.element.find('input[type="password"]');
            this.content.$toggleButton = this.element.find('a');
            this.content.$pswdInfo = this.element.find('.pswd_info');
            this.content.$strengthMeter = this.element.find("." + options.strengthMeterClass);
            this.content.$dataMeter = this.content.$strengthMeter.find("div");

            this._sync_inputs(this.content.$passwordInput, this.content.$textInput);
            this._sync_inputs(this.content.$textInput, this.content.$passwordInput);

            this._bind_input_events(this.content.$passwordInput);
            this._bind_input_events(this.content.$textInput);

            var that = this;
            this.content.$toggleButton.bind("click", function(e){
                e.preventDefault();

                that._toggle_input(that.content.$textInput);
                that._toggle_input(that.content.$passwordInput);

                var text = that.content.$passwordInput.is(":visible") ? that.options.showPasswordText: that.options.hidePasswordText;
                $(event.target).text(text);
            });
        },

        //Toggle active inputs.
        _toggle_input: function($element){
            $element.toggle();

            if($element.is(":visible")){
                $element.focus();
            }
        },

        //Copy value from active input inside hidden.
        _sync_inputs: function($s, $t){
            $s.bind('keyup', function () {
                var password = $s.val();
                $t.val(password);
            });
        },

        _bind_input_events: function($s) {
            var that = this;
            $s.bind('keyup', function () {
                var password = $s.val();

                // var characters = (password.length >= 10);
                var capitalletters = password.match(upperCase) ? 1 : 0;
                var loweletters = password.match(lowerCase) ? 1 : 0;
                var number = password.match(numbers) ? 1 : 0;
                var specialchar = password.match(specialchars) ? 1 : 0;
                var containWhiteSpace = password.indexOf(' ') >= 0 ? 1 : 0;

                var total =  capitalletters + loweletters + number + specialchar;
                that._update_indicator(total, password.length);

                that._update_info('length', password.length >= 6 && password.length <= 20);
                that._update_info('capital', capitalletters);
                that._update_info('number', number);
                that._update_info('specialchar', specialchar);
                that._update_info('letter', !containWhiteSpace);
            }).focus(function () {
                that.content.$pswdInfo.show();
            }).blur(function () {
                that.content.$pswdInfo.hide();
            });
        },

        _update_indicator: function(total, length) {
            var meter = this.content.$dataMeter;

            meter.removeClass();
            if (total === 0) {
                meter.html('');
                $('#user_new_password').addClass("error");
            } else if(length > 20) {
                meter.addClass('exceedlimit').html('<p>exceed limit</p>');
                $('#user_new_password').addClass("error");
            } else if (total === 1) {
                meter.addClass('veryweak').html('<p>very weak</p>');
                $('#user_new_password').addClass("error");
            } else if (total === 2) {
                meter.addClass('weak').html('<p>weak</p>');
                $('#user_new_password').addClass("error");
            } else if (total === 3 || (total === 4 && length < 6)) {
                meter.addClass('medium').html('<p>medium</p>');
                $('#user_new_password').addClass("error");
            } else if (total === 4 && length >= 8) {
                meter.addClass('strong').html('<p>strong</p>');

                if ($('#user_new_password').val() == $('#user_confirm_password').val()) {
                    $('#user_new_password').removeClass("error");
                }else {
                    $('#user_new_password').addClass("error");
                }

            } else {
                $('#user_new_password').addClass("error");
            }
        },

        _update_info: function(criterion, isValid) {
            var $passwordCriteria = this.element.find('li[data-criterion="' + criterion + '"]');

            if (isValid) {
                $passwordCriteria.removeClass('invalid').addClass('valid');
            } else {
                $passwordCriteria.removeClass('valid').addClass('invalid');
            }
        },

        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        _destroy: function () {
            this.element
                .removeClass( this.options.strengthWrapperClass )
                .text( "" );
        },

        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch (key) {
                case "someValue":
                    //this.options.someValue = doSomethingWith( value );
                    break;
                default:
                    //this.options[ key ] = value;
                    break;
            }
        }
    });

})( jQuery, window, document );