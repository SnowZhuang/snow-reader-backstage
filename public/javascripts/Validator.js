var Validator = {
    rules: {
        "email": function(value) {
            return /\w+@\w+([-]\w)*(\.\w)+/.test(value)
        },
        "minLength": function(value, length) {
            return value.length >= length;
        },
        "equals": function(value, elementId) {
            return value == $("#" + elementId).val();
        }


    },
    bind: function() {
        var validateElements = $("[validate]");
        var _self = this;
        //  minLength|6
        $.each(validateElements, function(index, element) {
            $(element).on("blur", function() {
                _self.validate(this);
            })
        });
    },
    validate: function(element) {
        var validateConfig = $(element).attr("validate");
        var config = validateConfig.split("|");
        var value = $(element).val();
        var ruleName = config[0];
        config[0] = $(element).val();


        var isValid = this.rules[ruleName].apply(this, config);
        if (isValid) {
            $(element).addClass('true');
            $(element).removeClass('false');

        } else {
            $(element).removeClass('true');
            $(element).addClass('false');

        }
        return isValid;
    },
    isValidAll: function() {
        var validateElements = $("[validate]");
        var validateResults = validateElements
            .map(function(index, element) {
                return Validator.validate(element);
            });
        return ArrayUtils.indexOf(validateResults, false) === -1;

    }
};