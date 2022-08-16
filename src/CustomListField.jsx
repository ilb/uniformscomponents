import { connectField } from 'uniforms';
import { ListField, ListItemField } from 'uniforms-semantic';
import { CustomAutoField } from './index';
import TextField from './TextField';

function CustomListField(props) {
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
            {!props.items.properties && <CustomAutoField label={null} />}
          </ListItemField>
        </ListField>
      )}
      {displayType === 'text' && (
        <div>
          <div className="custom-field-label-wrapper">
            <label className="custom-field-label">{props.label}</label>
          </div>
          {props.items.properties && (
            <div className="custom-field-object">
              {props.value.map((object, i) => (
                <>
                  {Object.keys(props.items.properties).map((item) => (
                    <CustomAutoField key={i} name={i + '.' + item} displayType="text" />
                  ))}
                </>
              ))}
            </div>
          )}
          {!props.items.properties && (
            <div className="custom-field-array">
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

export default connectField(CustomListField);
