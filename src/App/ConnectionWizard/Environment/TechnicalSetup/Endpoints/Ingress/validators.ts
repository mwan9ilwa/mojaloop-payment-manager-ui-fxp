import { createValidation, vd } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import { URLValidator, portValidator, IPAddressValidator } from '../validators';

const getIngressUrlValidation = () => createValidation([vd.isRequired, URLValidator]);
const getIngressPortValidation = () => createValidation([vd.isRequired, portValidator]);
const getIngressAddressValidation = () => createValidation([vd.isRequired, IPAddressValidator]);

export { getIngressUrlValidation, getIngressAddressValidation, getIngressPortValidation };
