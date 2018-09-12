function requiredFieldValidationService(){
    function _getRequiredValidationMessage( requiredInfos ){
        var errorMessages    = [];
        if( requiredInfos.length > 0 ){
            angular.forEach( requiredInfos, function( requiredInfo ){
                if( requiredInfo.name !== 'undefined' && ( requiredInfo.name === null || requiredInfo.name === '' || requiredInfo.name.length === 0 )){
                    errorMessages.push( requiredInfo.errorMessage );
                }
            })
        }

        return errorMessages;
    }

    return {
        getRequiredFieldValidationErrorMessage: _getRequiredValidationMessage
    };
}
