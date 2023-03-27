({
    doInit: function(component, event, helper) {
      // Initialize the attributes with default values
      component.set("v.contactFirstName", "");
      component.set("v.contactLastName", "");
    },
    handleContactFirstNameChange: function(component, event, helper) {
      // Get the value from the input field and set the contactFirstName attribute
      var contactFirstName = event.getSource().get("v.value");
      console.log("contactFirstName ", contactFirstName);
      component.set("v.contactFirstName", contactFirstName);
    },
    handleContactLastNameChange: function(component, event, helper) {
      // Get the value from the input field and set the contactLastName attribute
      var contactLastName = event.getSource().get("v.value");
      console.log("contactLastName ", contactLastName);
      component.set("v.contactLastName", contactLastName);
    },
    createContactJS: function(component, event, helper) {
      // Get the values from the attributes and pass them to the Apex controller
      console.log("createcontact ran");
      var contactFirstName = component.get("v.contactFirstName");
      var contactLastName = component.get("v.contactLastName");
      var action = component.get("c.createContact");
      action.setParams({
        contactFirstName: contactFirstName,
        contactLastName: contactLastName
      });
      action.setCallback(this, function(response) {
        var state = response.getState();
        console.log("state= ", response.getState());
        if (state === "SUCCESS") {
          var contact = response.getReturnValue();
           var displayMessage = JSON.stringify(contact);
          // Handle the successful response from the Apex controller
          console.log(
            "contact created successfully with ID: " + contact["Id"]
          );
          alert("contact- "+ contact["FirstName"]+ contact["LastName"]+ " Was Added Successfully");
        } else if (state === "ERROR") {
          // Handle the error response from the Apex controller
          alert(
            "contact- ",
            contactFirstName,
            " Was Not Added Successfully Due To This Error: ",
            response.getError()
          );
          console.error(response.getError());
        }
      });
      $A.enqueueAction(action);
    }
  });
  