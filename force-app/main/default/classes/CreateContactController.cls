public with sharing class CreateContactController {
    @AuraEnabled
    public static Contact createContact(String contactFirstName, String contactLastName) {
        Contact newContact = new Contact(FirstName = contactFirstName, LastName = contactLastName);
        try{
           insert newContact;
        }catch (Exception ex) {
            // If an unexpected error occurs, throw an AuraHandledException
            throw new AuraHandledException(ex.getMessage());
        } 
        return newContact;
    }
}




