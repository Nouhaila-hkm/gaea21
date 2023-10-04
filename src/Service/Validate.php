<?php

namespace App\Service;

class Validate
{
    public function isValid(?string $email): bool
    {
        if (!isset($email) || trim($email) === '') {

            return false;
        } else {

            return true;
        }
    }
}