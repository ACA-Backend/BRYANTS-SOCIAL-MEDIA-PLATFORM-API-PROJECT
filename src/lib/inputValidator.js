const validate = (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errors = {};
        error.details.forEach(({ path, message }) => {
          errors[path] = String(message).replace(/[\"]/g, '');
        });
  
        return res.status(400).json({ errors });
      }
  
      req.body = value;
      next();
    };
  };
  
  export default validate;
  