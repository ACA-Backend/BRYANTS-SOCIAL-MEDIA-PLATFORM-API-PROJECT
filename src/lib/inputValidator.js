const validator = ( schema, request ) =>
    {
        const errors = {}; 
        const { error, value } = schema.validate( request, { abortEarly: false} ); 
    
        if ( error )
        {
            error.details.forEach( ( { path, message } ) =>
            {
                errors[path] = String(message).replace( /[\"]/g, '' );
            } );
    
            return { errors };
        }
        return { value };
     };
    
    
    export default validator;