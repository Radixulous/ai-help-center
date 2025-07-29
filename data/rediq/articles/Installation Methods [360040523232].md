---
attachments: []
category: QuickSync
created_at: '2020-03-13T18:50:49Z'
id: 360040523232
original_url: https://rediq.zendesk.com/hc/en-us/articles/360040523232-Installation-Methods
section: Getting Started
title: Installation Methods
updated_at: '2024-10-07T16:41:56Z'
---

### **Purpose**

This guide will explain how to install the redIQ QuickSync Excel Add-in.  Three different approaches for installation will be discussed.  

### **Before Getting Started**

For some of the methods below, you will need appropriate permissions.  If you are a member of a large organization, we recommend discussing with your IT administrator or department to ensure you can install QuickSync for you or your organization.

If you have any questions, please reach out to [support@rediq.com](mailto:support@rediq.com).

### **Deployment Options**

### AppSource

#### Recommended Method

This is the easiest, fastest, and most reliable installation method.

This approach is best for individual users installing the add-in for individual use.  Simply [visit the page for QuickSync](https://appsource.microsoft.com/en-us/product/office/WA200001147) in Microsoft AppSource, click "Get It Now", and then follow the steps to install.  In general, the add-in will update immediately after updates to the add-in are released.  In some rare cases, the updates will not appear until a user restarts Excel.

### **Centralized Deployment**

#### Office 365 Admin Needed

This approach requires being or have access to an Office 365 admin.

This approach is best for organizations deploying the add-in across a number of users.  For more information on this approach, visit [Microsoft's documentation on Centralized Deployments](https://docs.microsoft.com/en-us/office/dev/add-ins/publish/centralized-deployment#recommended-approach-for-deploying-office-add-ins). This approach can be used to deploy add-ins from the AppSource.  In general, the add-in will update immediately after updates to the add-in are released.  In some rare cases, the updates will not appear until a user restarts Excel.

### **Sideload**

This approach is helpful for testing use of the add-in.  It is not recommended for long term use because it requires each user in an organization to install the add-in individually and requires updating the manifest file for the add-in whenever there are updates from redIQ. For more information on this approach, visit [Microsoft's documentation on Sideloading Add-ins](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins).  For sideloading on Mac, visit [Microsoft's documentation on Sideloading Add-ins on Mac](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac).  To access the manifest, go to the following url: <https://excel.rediq.io/manifest.xml> and save as an XML document.

Once a folder with the manifest has been shared, the shared folder can then be distributed across users for installation.  If the manifest in the shared folder is updated, the users using the folder will see the changes reflected when they restart Excel. 

#### Grant Folder Access Permission

This approach requires permission to grant network access to a folder.