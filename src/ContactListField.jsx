import { connectField } from 'uniforms';
import { ListField, ListItemField } from 'uniforms-semantic';
import PhoneField from './PhoneField';

function ContactListField() {
  return (
    <ListField>
      <ListItemField name="$">
        <PhoneField label={null} />
      </ListItemField>
    </ListField>
  );
}

export default connectField(ContactListField);
