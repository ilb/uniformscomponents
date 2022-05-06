import { connectField } from 'uniforms';
import { ListField, ListItemField } from 'uniforms-semantic';
import { CustomAutoField, PhoneField } from './index';

function ContactListField(props) {
  return (
    <ListField>
      <ListItemField name="$">
        {props.items.properties &&
          Object.keys(props.items.properties).map((item) => (
            <CustomAutoField name={item} key={item} />
          ))}
        {!props.items.properties && <PhoneField label={null} />}
      </ListItemField>
    </ListField>
  );
}

export default connectField(ContactListField);
