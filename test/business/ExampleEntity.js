import Speck from 'speck-entity';
import PropTypes from 'prop-types';

export default class ExampleEntity extends Speck {
  static SCHEMA = {
    id: {
      type: Number,
      builder: (value) => parseInt(value, 10),
      validator: PropTypes.number.isRequired
    },
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['female', 'male']),
    adasdasdas: PropTypes.oneOf(['a', 'b']),
    idade: PropTypes.number,
    mycustom: PropTypes.string.isRequired
  };
}
