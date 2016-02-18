# whistler
Code for an add-on for Google Sheets that'll notify on Flock when a sheet of interest has been modded.

#####Note:
*This has been submitted to the add-on store and will be published soon for your use with any Google spreadsheet.*

####The sheet has the following limitations:

- If the add on was installed from X domain, all editors outside X will show up as 'Anonymous' in notifications.
- This has limited processing time available on Googles's servers and might stop working on excessive use. This limit isn't easy to reach.

####How to use this before it gets published onto the store:

**Note: Only the sheet owner needs to do this once**

1. Open a Google spreadsheet of your choice
2. Get to the script editor from Tools --> Script Editor
3. Paste the code from Whistler to a file there, save and change placeholders for Google's URL shortner API key, Flock incoming webhook URL to the ones you have.
4. Set a time driven trigger for checkOutstandingNotes() to run every min or maybe every 5 min.
