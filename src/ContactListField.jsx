import { connectField } from 'uniforms';
import { ListField, ListItemField } from 'uniforms-semantic';
import { CustomAutoField, PhoneField } from './index';
import TextField from './TextField';

function ContactListField(props) {
  const displayType = props.field.uniforms?.displayType || 'input';

  return (
    <>
      {displayType === 'input' && (
        <ListField>
          <ListItemField name="$">
            {props.items.properties &&
              Object.keys(props.items.properties).map((item) => (
                <CustomAutoField name={item} key={item} />
              ))}
            {!props.items.properties && <PhoneField label={null} />}
          </ListItemField>
        </ListField>
      )}
      {displayType === 'text' && (
        <div>
          <div className="contacts-label-wrapper">
            <label className="contacts-label">{props.label}</label>
          </div>
          {props.items.properties && (
            <div className="contacts-object">
              {props.value.map((object, i) => (
                <>
                  {Object.keys(props.items.properties).map((item) => (
                    <TextField key={i} name={i + '.' + item} displayType="text" />
                  ))}
                </>
              ))}
            </div>
          )}
          {!props.items.properties && (
            <div className="contacts-array">
              {props.value.map((value, i) => (
                <TextField key={i} label={null} value={value} name={i} displayType="text" />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default connectField(ContactListField);
