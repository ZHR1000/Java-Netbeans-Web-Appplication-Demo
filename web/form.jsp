<%@page contentType="text/xml" pageEncoding="UTF-8"%>
  <items>
    <item type="fieldset" name="data" label="Welcome" inputWidth="auto">
      <item type="input" name="name" label="Name" validate="^[a-zA-Z]*$,NotEmpty" position="label-top"/>
      <item type="input" name="number" label="Phone Number" validate="^[0-9]{10}$,NotEmpty" position="label-top"/>
      <item type="input" name="email" label="Email" validate="ValidEmail,NotEmpty" position="label-top"/>
      <item type="button" name="submit" value="submit"/>
    </item>
  </items>